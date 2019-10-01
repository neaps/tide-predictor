import harmonics from '../index'
import constituentTypes from '../constituent-types'
import mockHarmonicConstituents from '../__mocks__/constituents'
import moment from 'moment'

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
    testHarmonics.setTimeSpan(moment(), moment())
  } catch (error) {
    timeErrorMessage = error
  }
  expect(timeErrorMessage).toBe(false)
})
