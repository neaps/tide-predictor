/* eslint-disable */
import constituents from './constituents'
import astro from './astronomy'
import regression from 'regression'
import { d2r, modulus } from './astronomy/constants'

const dotArray = (a, b) => {
  const results = []
  a.forEach((value, index) => {
    results.push(value * b[index])
  })
  return results.reduce((total, value) => {
    return total + value
  })
}

const tidalSeries = ({ t, amplitude, phase, baseSpeed, u, f, baseValue }) => {
  return amplitude * f * Math.cos(baseSpeed * t + (baseValue + u) - phase)
}

const prepare = (start, constituents, waterLevel) => {
  const baseAstro = astro(start)

  const baseValue = {}
  const baseSpeed = {}
  const u = []
  const f = []
  Object.keys(constituents).forEach(key => {
    const constituent = constituents[key]
    const value = constituent.value(baseAstro)
    const speed = constituent.speed(baseAstro)
    baseValue[constituent.name] = d2r * value
    baseSpeed[constituent.name] = d2r * speed
  })

  waterLevel.forEach(item => {
    const uItem = {}
    const fItem = {}
    const itemAstro = astro(item.time)
    Object.keys(constituents).forEach(key => {
      const constituent = constituents[key]
      const constituentU = modulus(constituent.u(itemAstro), 360)

      uItem[constituent.name] = d2r * constituentU
      fItem[constituent.name] = modulus(constituent.f(itemAstro), 360)
    })
    u.push(uItem)
    f.push(fItem)
  })

  return {
    baseValue: baseValue,
    baseSpeed: baseSpeed,
    u: u,
    f: f
  }
}

const prepareWaterLevel = waterLevels => {
  const firstTime = waterLevels[0].time
  // Sort water levels by time
  waterLevels.sort((a, b) => {
    if (a.time < b.time) {
      return -1
    }
    if (a.time > b.time) {
      return 1
    }
    return 0
  })

  // Compute water level hours
  let heights = []
  waterLevels = waterLevels.map(waterLevel => {
    waterLevel.hour = (waterLevel.time - firstTime) / (1000 * 60 * 60)
    heights.push(waterLevel.level)
    return waterLevel
  })

  // Remove mean level from heights
  const meanHeight =
    heights.reduce((total, current) => total + current) / heights.length
  heights = heights.map(height => height - meanHeight)

  return {
    firstTime: firstTime,
    levels: waterLevels,
    heights: heights
  }
}

const computeInitialAmplitude = (heights, numberConstituents) => {
  const mainAmplitude = Math.sqrt(dotArray(heights, heights)) / heights.length
  return mainAmplitude
  const initial = {
    amplitudes: new Array(numberConstituents),
    phases: new Array(numberConstituents)
  }

  initial.amplitudes.fill(mainAmplitude, 0, numberConstituents)
  initial.phases.fill(1, 0, numberConstituents)
  return initial
}

// Skip over constituents that don't have enough periods
// in the timeline
const getComputeConstituents = (firstTime, totalHours, requiredPeriod) => {
  const computeConstituents = {}
  const firstAstro = astro(firstTime)

  Object.keys(constituents).forEach(key => {
    if (key === 'Z0') {
      return
    }
    if (
      360.0 * requiredPeriod <
      totalHours * constituents[key].speed(firstAstro)
    ) {
      computeConstituents[key] = constituents[key]
    }
  })
  return computeConstituents
}

const residual = (initialAmplitude, levels, { baseSpeed, u, f, baseValue }) => {
  const result = []

  return result
}

const compute = (waterLevels, options) => {
  const { requiredPeriod } =
    typeof options !== 'undefined'
      ? options
      : {
          requiredPeriod: 2
        }

  if (!Array.isArray(waterLevels) || !waterLevels.length) {
    throw new Error('Tide observations must be an array')
  }
  if (
    typeof waterLevels[0].time === 'undefined' ||
    typeof waterLevels[0].level === 'undefined'
  ) {
    throw new Error(
      'Tide observations be an array of objects with the properties "time" and "level"'
    )
  }

  const { firstTime, levels, heights } = prepareWaterLevel(waterLevels)

  const totalHours = levels[levels.length - 1].hour
  const computeConstituents = getComputeConstituents(
    firstTime,
    totalHours,
    requiredPeriod
  )

  const numberConstituents = Object.keys(computeConstituents).length

  const preparedValues = prepare(firstTime, computeConstituents, levels)

  const initialAmplitude = computeInitialAmplitude(heights, numberConstituents)

  const model = {}

  const residualValues = residual(initialAmplitude, levels, preparedValues)

  Object.keys(computeConstituents).forEach(name => {
    const data = [[initialAmplitude, 0]]
    levels.forEach((level, i) => {
      if (typeof u[i][name] === 'undefined') {
        return
      }
      const tide = tidalSeries({
        t: level.hour,
        amplitude: heights[i],
        phase: level.hour,
        baseSpeed: baseSpeed[name],
        u: u[i][name],
        f: f[i][name],
        baseValue: baseValue[name]
      })
      data.push([tide, level.hour])
    })
    const result = regression.linear(data)
    model[name] = {
      amplitude: result.equation[0],
      phase: result.equation[1]
    }
  })
  return model
}

export default compute
export { prepareWaterLevel, computeInitialAmplitude, getComputeConstituents }
