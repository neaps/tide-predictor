import mockStation from '../__mocks__/station'
import tidePrediction from '../index.js'

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
  test('it is created correctly', () => {
    let stationCreated = true
    let testStation = {} // eslint-disable-line
    try {
      testStation = tidePrediction(mockStation)
    } catch (e) {
      stationCreated = false
    }
    expect(stationCreated).toBeTruthy()

    testStation = {}
    try {
      testStation = tidePrediction(mockStation)
    } catch (e) {
      stationCreated = false
    }
    expect(stationCreated).toBeTruthy()
  })

  test('it predicts the tides in a timeline', () => {
    const results = tidePrediction(mockStation).getTimelinePrediction(
      startDate,
      endDate
    )
    expect(results[0].level).toBeCloseTo(-1.34712509, 3)
    expect(results.pop().level).toBeCloseTo(2.85263589, 3)
  })

  test('it predicts the tidal extremes', () => {
    const results = tidePrediction(mockStation).getExtremesPrediction(
      startDate,
      endDate
    )
    expect(results[0].level).toBeCloseTo(-1.565033, 4)
  })

  test('it fetches a single water level', () => {
    const result = tidePrediction(mockStation).getWaterLevelAtTime(startDate)
    expect(result.level).toBeCloseTo(-1.34712509, 4)
  })

  test('it adds offset phases', () => {
    const results = tidePrediction(mockStation, {
      offset: 3
    }).getExtremesPrediction(startDate, endDate)

    expect(results[0].level).toBeCloseTo(1.43496678, 4)
  })
})
