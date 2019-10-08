import harmonics from '../index'
import constituentTypes from '../constituent-types'
import mockHarmonicConstituents from '../__mocks__/constituents'

const startDate = new Date(1567346400 * 1000) //2019-09-01
const endDate = new Date(1569966078 * 1000) //2019-10-01

test('constituentTypes has types defined', () => {
  expect(constituentTypes.M2).toBeDefined()
  expect(constituentTypes.M3).toBe('Lunar terdiurnal constituent')
})

describe('harmonics', () => {
  test('it checks constituents', () => {
    let errorMessage = false
    try {
      let testHarmonics = new harmonics('not array')
    } catch (error) {
      errorMessage = error
    }
    expect(errorMessage).toBe('Harmonic constituents are not an array')

    errorMessage = false

    try {
      let testHarmonics = new harmonics([
        {
          name: 'M2',
          description: 'Principal lunar semidiurnal constituent',
          amplitude: 1.61,
          phase_GMT: 181.3,
          phase_local: 309.4,
          speed: 28.984104
        },
        {
          name: 'S2',
          description: 'Principal solar semidiurnal constituent',
          amplitude: 0.43,
          phase_GMT: 180.1,
          phase_local: 309.4
        }
      ])
    } catch (error) {
      errorMessage = error
    }
    expect(errorMessage).toBe('Harmonic constituent entry missing field speed')
  })

  test('it checks start and end times', () => {
    const testHarmonics = new harmonics(mockHarmonicConstituents)
    let timeErrorMessage = false
    try {
      testHarmonics.setTimeSpan('lkjsdlf', 'sdfklj')
    } catch (error) {
      timeErrorMessage = error
    }
    expect(timeErrorMessage).toBe(
      'Invalid date format, should be a Date object, or timestamp'
    )

    timeErrorMessage = false
    try {
      testHarmonics.setTimeSpan(startDate, startDate)
    } catch (error) {
      timeErrorMessage = error
    }
    expect(timeErrorMessage).toBe('Start time must be before end time')

    timeErrorMessage = false
    try {
      testHarmonics.setTimeSpan(startDate, endDate)
    } catch (error) {
      timeErrorMessage = error
    }
    expect(timeErrorMessage).toBeFalsy()
  })

  test('it parses dates correctly', () => {
    const harmonicsTime = new harmonics(mockHarmonicConstituents)
    const parsedDate = harmonicsTime.getDate(startDate)
    expect(parsedDate.getTime()).toBe(startDate.getTime())

    const parsedUnixDate = harmonicsTime.getDate(startDate.getTime() / 1000)
    expect(parsedUnixDate.getTime()).toBe(startDate.getTime())
  })

  test('it creates timeline correctly', () => {
    const seconds = 20 * 60
    const harmonicsTime = new harmonics(mockHarmonicConstituents)
    harmonicsTime.setTimeSpan(startDate, endDate)
    const difference =
      Math.round(
        (endDate.getTime() / 1000 - startDate.getTime() / 1000) / seconds
      ) + 1
    const { items, hours } = harmonicsTime.timeline(seconds)
    expect(items.length).toBe(difference)
    expect(hours.length).toBe(difference)
  })
})
