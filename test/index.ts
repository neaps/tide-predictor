import assert from 'assert'
import closeTo from './lib/close-to.js'
import mockConstituents from './_mocks/constituents.js'
import tidePrediction from '../src/index.js'

const startDate = new Date()
startDate.setFullYear(2019)
startDate.setMonth(8)
startDate.setDate(1)
startDate.setHours(0)
startDate.setMinutes(0)
startDate.setSeconds(0)
startDate.setMilliseconds(0)

const endDate = new Date()
endDate.setFullYear(2019)
endDate.setMonth(8)
endDate.setDate(1)
endDate.setHours(6)
endDate.setMinutes(0)
endDate.setSeconds(0)
endDate.setMilliseconds(0)

describe('Tidal station', () => {
  it('it is created correctly', () => {
    let stationCreated = true

    try {
      tidePrediction(mockConstituents)
    } catch (e) {
      stationCreated = false
    }
    assert.ok(stationCreated)

    try {
      tidePrediction(mockConstituents)
    } catch (e) {
      stationCreated = false
    }
    assert.ok(stationCreated)
  })

  it('it predicts the tides in a timeline', () => {
    const results = tidePrediction(mockConstituents).getTimelinePrediction({
      start: startDate,
      end: endDate
    })
    closeTo(results[0].level, -1.34712509, 3)
    closeTo(results.pop().level, 2.85263589, 3)
  })

  it('it predicts the tidal extremes', () => {
    const results = tidePrediction(mockConstituents).getExtremesPrediction({
      start: startDate,
      end: endDate
    })
    closeTo(results[0].level, -1.565033, 4)
  })

  it('it predicts the tidal extremes with high fidelity', () => {
    const results = tidePrediction(mockConstituents).getExtremesPrediction({
      start: startDate,
      end: endDate,
      timeFidelity: 60
    })
    closeTo(results[0].level, -1.565389, 4)
  })

  it('it fetches a single water level', () => {
    const result = tidePrediction(mockConstituents).getWaterLevelAtTime({
      time: startDate
    })
    closeTo(result.level, -1.34712509, 4)
  })

  it('it adds offset phases', () => {
    const results = tidePrediction(mockConstituents, {
      offset: 3
    }).getExtremesPrediction({ start: startDate, end: endDate })

    closeTo(results[0].level, 1.43496678, 4)
  })
})
