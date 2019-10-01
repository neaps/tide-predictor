import mockStation from '../__mocks__/station'
import station from '../index'

test('station setup and test valid harmonics', () => {
  try {
    let testStation = new station({
      name: 'Station missing harmonics'
    })
  } catch (error) {
    expect(error).toBe('Harmonics data is not an array')
  }

  try {
    let testStation = new station({
      name: 'Station missing valid harmonics',
      HarmonicConstituents: [
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
      ]
    })
  } catch (error) {
    expect(error).toBe(`Harmonic entry missing field speed`)
  }
})
