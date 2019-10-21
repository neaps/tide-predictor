import constituents from './constituents'
import astro from './astronomy'
import regression from 'regression'
import { d2r, modulus } from './astronomy/constants'

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
  const model = {}


  return model
}