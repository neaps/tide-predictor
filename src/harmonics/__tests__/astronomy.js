import {
  sexagesimalToDecimal,
  polynomial,
  derivativePolynomial,
  terrestrialObliquityCoefficients
} from '../astronomy'

describe('astronomy', () => {
  test('converts a sexagesimal angle into decimal degrees', () => {
    expect(sexagesimalToDecimal(10, 10, 10, 10, 10)).toBe(10.169447225)
  })

  test('evaluates a polynomial', () => {
    expect(polynomial([1, 2, 3], 3)).toBe(34)
  })

  test('evaluates derivative polynomials', () => {
    expect(derivativePolynomial([1, 2, 3], 3)).toBe(20)
  })

  test('calculates terrestrial oliquity coefficients rewritten to T', () => {
    expect(terrestrialObliquityCoefficients[1]).toBe(-0.013002583333333335)
  })
})
