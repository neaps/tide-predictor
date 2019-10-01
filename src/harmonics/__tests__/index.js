import harmonics, { harmonicTypes } from '../index'

test('harmonicTypes has types defined', () => {
  expect(harmonicTypes.M2).toBeDefined()
  expect(harmonicTypes.M3).toBe('Lunar terdiurnal constituent')
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
