import mockStation from '../__mocks__/station'
import station from '../index'
import moment from 'moment'

const startDate = moment({
  years: 2019,
  months: 8,
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
})

const endDate = moment({
  years: 2019,
  months: 8,
  date: 1,
  hours: 6,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
})

describe('Tidal station', () => {
  test('it is created correctly', () => {
    let stationCreated = true
    try {
      const testStation = new station(mockStation)
    } catch {
      stationCreated = false
    }
    expect(stationCreated).toBeTruthy()
    expect(stationCreated.isSubordinate).toBeFalsy()
  })

  test('it sets timespan', () => {
    let timeErrorMessage = false
    const testStation = new station(mockStation)
    try {
      testStation.setTimeSpan(startDate, endDate)
    } catch (error) {
      timeErrorMessage = error
    }
    expect(timeErrorMessage).toBeFalsy()
  })

  test('it throws error if times are not set', () => {
    const testStation = new station(mockStation)
    let timeError = false
    try {
      testStation.getTimelinePrediction()
    } catch (error) {
      timeError = error
    }
    expect(timeError).toBe('Start and end times not set')
  })

  test('it predicts the tides in a timeline', () => {
    const testStation = new station(mockStation)
    testStation.setTimeSpan(startDate, endDate)
    const results = testStation.getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.40468181, 3)
    expect(results[6].level).toBeCloseTo(2.60312343, 3)
  })
})
