import constituents from './constituents'
import astro from './astronomy'
import regression from 'regression'
import { d2r, modulus } from './astronomy/constants'
import ndarray from 'ndarray'
import ops from 'ndarray-ops'
import fill from 'ndarray-fill'

const dotArray = (a, b) => {
  const results = []
  a.forEach((value, index) => {
    results.push(value * b[index])
  })
  return results.reduce((total, value) => {
    return total + value
  })
}

const partition = (hours, partition) => {
  const result = []
  for (let i = 0; i < hours.length; i += partition) {
    result.push(hours.slice(i, i + partition))
  }
  return result
}
// times = Tide._times(t0, [(i + 0.5)*partition for i in range(len(t))]); print [(i + 0.5)*partition for i in range(len(t))]

const prepareTimes = (startTime, partition, t) => {
  const hours = []
  const start = startTime.getTime()
  for (let i = 0; i < t.length; i++) {
    hours.push(new Date(start + (i + 0.5) * partition * 60 * 60 * 1000))
  }
  return hours
}
//speed, u, f, V0 = Tide._prepare(constituents, t0, times, radians = True)

const prepare = (computeConstituents, startTime, times) => {
  const speed = [[]],
    u = [],
    f = [],
    V0 = [[]]

  const startAstro = astro(startTime)

  const astros = []
  times.forEach(time => {
    astros.push(astro(time))
  })

  computeConstituents.forEach(constituent => {
    V0[0].push(d2r * constituent.value(startAstro))
    speed[0].push(d2r * constituent.speed(startAstro))
  })

  astros.forEach(timeAstro => {
    const uTime = []
    const fTime = []
    computeConstituents.forEach(constituent => {
      uTime.push(d2r * modulus(constituent.u(timeAstro), 360))
      fTime.push(modulus(constituent.f(timeAstro), 360))
    })
    u.push([uTime])
    f.push([fTime])
  })

  return {
    speed: speed,
    u: u,
    f: f,
    V0: V0
  }
}

const compute = waterLevels => {
  const requiredPeriod = 2
  const partitionTime = 240
  const interval = 1

  waterLevels.sort((a, b) => {
    if (a.time < b.time) {
      return -1
    }
    if (a.time > b.time) {
      return 1
    }
    return 0
  })

  let hours = []
  let heights = []
  const computeConstituents = []

  const startTime = waterLevels[0].time
  waterLevels.forEach(level => {
    hours.push((level.time - startTime) / (1000 * 60 * 60))
    heights.push(level.level)
  })

  const meanHeight =
    heights.reduce((total, height) => total + height) / heights.length

  heights = heights.map(height => height - meanHeight)

  const firstAstro = astro(startTime)
  Object.keys(constituents).forEach(name => {
    if (name === 'Z0') {
      return
    }
    if (
      /*360.0 * requiredPeriod <
        hours[hours.length - 1] * constituents[name].speed(firstAstro) &&*/
      name === 'M2' ||
      name === 'M1'
    ) {
      computeConstituents.push(constituents[name])
    }
  })
  const t = partition(hours, partitionTime)
  const times = prepareTimes(startTime, partitionTime, t)

  const { speed, u, f, V0 } = prepare(computeConstituents, startTime, times)

  const constituentTotal = computeConstituents.length

  const amplitudes = new Array(constituentTotal)
  const periods = new Array(constituentTotal)
  periods.fill(1, 0, constituentTotal)
  const amplitude = Math.sqrt(dotArray(heights, heights)) / heights.length
  amplitudes.fill(amplitude, 0, constituentTotal)
  const initial = amplitudes.concat(periods)

  const tidalSeries = (t, amplitude, phase, speed, u, f, V0) => {
    const sum = []
    speed.forEach((s, i) => {
      s.forEach((s_i, k) => {
        const speed_r = []
        t.forEach(t_i => {
          speed_r.push(
            amplitude[i][k] *
              f[i][k] *
              Math.cos(s_i * t_i + (V0[i][k] + u[i][k]) - phase[i][k])
          )
        })
        sum.push(speed_r)
      })
    })
    const totals = []
    sum.forEach((s, i) => {
      s.forEach((r, k) => {
        if (typeof totals[k] === 'undefined') {
          totals[k] = 0
          sum.forEach(s2 => {
            totals[k] += s2[k]
          })
        }
      })
    })
    return totals
  }

  const residual = hp => {
    const H = [hp.slice(0, constituentTotal)]
    const p = [hp.slice(constituentTotal)]
    const s = []
    t.forEach((t_i, i) => {
      tidalSeries(t_i, H, p, speed, u[i], f[i], V0).forEach(ts => {
        s.push(ts)
      })
    })
    const newHeights = heights.map((height, i) => height - s[i])
    const result = []
    newHeights.forEach((height, i) => {
      result.push(newHeights[i])
    })
    return result
  }

  const tidalDhSeries = (t, speed, u, f, V0, p) => {
    const results = []
    speed.forEach((s, i) => {
      s.forEach((s_i, k) => {
        const r = []
        t.forEach(t_i => {
          r.push(
            -1 * (f[i][k] * Math.cos(s_i * t_i + u[i][k] + V0[i][k] - p[i][k]))
          )
        })
        results.push(r)
      })
    })
    return results
  }

  const tidalDpSeries = (H, t, speed, u, f, V0, p) => {
    const results = []
    speed.forEach((s, i) => {
      s.forEach((s_i, k) => {
        const r = []
        t.forEach(t_i => {
          r.push(
            -1 *
              (H[i][k] *
                f[i][k] *
                Math.sin(s_i * t_i + u[i][k] + V0[i][k] - p[i][k]))
          )
        })
        results.push(r)
      })
    })
    return results
  }

  const dResidual = hp => {
    const H = [hp.slice(0, constituentTotal)]
    const p = [hp.slice(constituentTotal)]
    const ds_dH = []
    const results = []

    t.forEach((t_i, i) => {
      tidalDhSeries(t_i, speed, u[i], f[i], V0, p).forEach(ts => {
        results.push(ts)
      })
    })

    const ds_dp = []
    t.forEach((t_i, i) => {
      tidalDpSeries(H, t_i, speed, u[i], f[i], V0, p).forEach(ts => {
        results.push(ts)
      })
    })

    return results
  }

  const initialResidual = residual(initial)
  console.log(initialResidual)

  const model = {}

  return model
}

export default compute
