import constituent, {
  astronimicDoodsonNumber,
  astronomicSpeed,
  astronomicValues
} from '../constituent'
import astro from '../../astronomy'

const sampleTime = new Date()
sampleTime.setFullYear(2019)
sampleTime.setMonth(9)
sampleTime.setDate(4)
sampleTime.setHours(10)
sampleTime.setMinutes(15)
sampleTime.setSeconds(40)
sampleTime.setMilliseconds(10)

const testAstro = astro(sampleTime)

// This is a made-up doodson number for a test coefficient
const testConstituent = constituent('test', [1, 1, -1, 0, 0, 0, 1])

describe('constituent', () => {
  test('it throws error if missing coefficients', () => {
    let errorMessage = false
    try {
      const a = constituent('fail') // eslint-disable-line
    } catch (error) {
      errorMessage = error
    }
    expect(errorMessage.message).toBe(
      'Coefficient must be defined for a constituent'
    )
  })

  test('it fetches astronimic Doodson Number values', () => {
    const values = astronimicDoodsonNumber(testAstro)
    expect(values[0].value).toBe(testAstro['T+h-s'].value)
  })

  test('it fetches astronimic speed', () => {
    const values = astronomicSpeed(testAstro)
    expect(values[0]).toBe(testAstro['T+h-s'].speed)
  })

  test('it fetches astronimic values', () => {
    const values = astronomicValues(testAstro)
    expect(values[0]).toBe(testAstro['T+h-s'].value)
  })

  test('it computes constituent value', () => {
    expect(testConstituent.value(testAstro)).toBeCloseTo(423.916666657, 4)
  })

  test('it computes constituent speed', () => {
    expect(testConstituent.speed(testAstro)).toBe(15)
  })

  test('it returns u correctly', () => {
    expect(testConstituent.u(testAstro)).toBe(0)
  })

  test('it returns f correctly', () => {
    expect(testConstituent.f(testAstro)).toBe(1)
  })
})
