import mockStation from '../__mocks__/station'
import Station from '../index'

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
    let testStation = {}
    try {
      testStation = new Station(mockStation)
    } catch (e) {
      stationCreated = false
    }
    expect(stationCreated).toBeTruthy()
    expect(testStation.isSubordinate).toBeFalsy()
  })

  test('it sets timespan', () => {
    let timeErrorMessage = false
    const testStation = new Station(mockStation)
    try {
      testStation.setTimeSpan(startDate, endDate)
    } catch (error) {
      timeErrorMessage = error
    }
    expect(timeErrorMessage).toBeFalsy()
  })

  test('it throws error if times are not set', () => {
    const testStation = new Station(mockStation)
    let timeError = false
    try {
      testStation.getTimelinePrediction()
    } catch (error) {
      timeError = error
    }
    expect(timeError.message).toBe('Start and end times not set')
  })

  test('it predicts the tides in a timeline', () => {
    const testStation = new Station(mockStation)
    testStation.setTimeSpan(startDate, endDate)
    const results = testStation.getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.40468181, 3)
    expect(results.pop().level).toBeCloseTo(2.60312343, 3)
  })
})
