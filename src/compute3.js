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
    heights.push(level.level)
  })
  const meanHeight =
    heights.reduce((total, height) => total + height) / heights.length

  waterLevels = waterLevels.map(level => {
    level._hour = (level.time - startTime) / (1000 * 60 * 60) + 1
    level._levelMinusMean = level.level - meanHeight
    level._astro = astro(level.time)
    level.u = {}
    level.f = {}
    hours.push(level._hour)
    return level
  })

  const firstAstro = astro(startTime)

  Object.keys(constituents).forEach(name => {
    if (name === 'Z0') {
      return
    }
    if (
      360.0 * requiredPeriod <
      hours[hours.length - 1] * constituents[name].speed(firstAstro)
    ) {
      computeConstituents.push(name)
    }
  })

  const model = []

  const baseSpeed = {}
  const baseV0 = {}

  computeConstituents.forEach(name => {
    const constituent = constituents[name]
    baseV0[constituent.name] = d2r * constituent.value(firstAstro)
    baseSpeed[constituent.name] = d2r * constituent.speed(firstAstro)
    waterLevels = waterLevels.map(level => {
      level.u[name] = d2r * modulus(constituent.u(level._astro), 360)
      level.f[name] = modulus(constituent.f(level._astro), 360)
      return level
    })
  })

  computeConstituents.forEach(name => {
    const constituentSeries = []
    waterLevels.forEach(level => {
      constituentSeries.push([
        level._hour,
        level.f[name] * level.f[name] +
          Math.cos(
            baseSpeed[name] * level._hour +
              (baseV0[name] + level.u[name]) -
              level._hour
          )
      ])
    })
    const result = regression.linear(constituentSeries)
    console.log(constituentSeries)
    model[name] = {
      phase: result.equation[0],
      amplitude: result.equation[1]
    }
  })
  console.log(model)
  //computeConstituents.forEach(constituent => {})

  return model
  /*
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
      360.0 * requiredPeriod <
        hours[hours.length - 1] * constituents[name].speed(firstAstro)
    ) {
      computeConstituents.push(constituents[name])
    }
  })
  const t = partition(hours, partitionTime)
  const times = prepareTimes(startTime, partitionTime, t)

  const { speed, u, f, V0 } = prepare(computeConstituents, startTime, times)

  const initialAmplitude =
    Math.sqrt(dotArray(heights, heights)) / heights.length
  const initial = [1, initialAmplitude]

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
      result.push([hours[i], newHeights[i]])
    })
    return result
  }

  const r = residual(initial)
  console.log(regression.linear(residual(initial)))*/
}

export default compute
