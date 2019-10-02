import harmonics from '../index'
import constituentTypes from '../constituent-types'
import mockHarmonicConstituents from '../__mocks__/constituents'
import moment from 'moment'

const startDate = moment.unix(1567346400) //2019-09-01
const endDate = moment.unix(1569966078) //2019-10-01

test('constituentTypes has types defined', () => {
  expect(constituentTypes.M2).toBeDefined()
  expect(constituentTypes.M3).toBe('Lunar terdiurnal constituent')
})

test('harmonics constituents are valid', () => {
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

test('start and end times are set correctly', () => {
  const testHarmonics = new harmonics(mockHarmonicConstituents)
  let timeErrorMessage = false
  try {
    testHarmonics.setTimeSpan('lkjsdlf', 'sdfklj')
  } catch (error) {
    timeErrorMessage = error
  }
  expect(timeErrorMessage).toBe(
    'Invalid date format, should be a moment object, Date object, or timestamp'
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

  timeErrorMessage = false
  try {
    const harmonicsNoTime = new harmonics(mockHarmonicConstituents)
    harmonicsNoTime.getStartYear()
  } catch (error) {
    timeErrorMessage = error
  }
  expect(timeErrorMessage).toBe('Start date is not yet set')
})

test('harmonics finds the correct start of year', () => {
  const harmonicsTime = new harmonics(mockHarmonicConstituents)
  harmonicsTime.setTimeSpan(startDate, endDate)

  expect(harmonicsTime.getStartYear()).toBe(moment('2019-01-01').unix())
})

test('harmonics creates timeline correctly', () => {
  const seconds = 20 * 60
  const harmonicsTime = new harmonics(mockHarmonicConstituents)
  harmonicsTime.setTimeSpan(startDate, endDate)
  const difference =
    Math.round((endDate.unix() - startDate.unix()) / seconds) + 1
  const { unixTimestamps, hours } = harmonicsTime.timeline(seconds)
  expect(unixTimestamps.length).toBe(difference)
  expect(hours.length).toBe(
    Math.round((endDate.unix() - startDate.unix()) / 60) + 1
  )
})
