import {
  sexagesimalToDecimal,
  terrestrialObliquityCoefficients
} from '../astronomy'

describe('astronomy', () => {
  test('converts a sexagesimal angle into decimal degrees', () => {
    expect(sexagesimalToDecimal(10, 10, 10, 10, 10)).toBe(10.169447225)
  })
  test('evaluates a polynomial', () => {
    expect(sexagesimalToDecimal(10, 10, 10, 10, 10)).toBe(10.169447225)
  })
  test('calculates terrestrial oliquity coefficients rewritten to T', () => {
    expect(terrestrialObliquityCoefficients[1]).toBe(-0.013002583333333335)
  })
})
