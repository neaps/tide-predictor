import {
  sexagesimalToDecimal,
  polynomial,
  derivativePolynomial,
  JD,
  T,
  terrestrialObliquityCoefficients,
  _I
} from '../astronomy'

const sampleTime = {
  year: 2019,
  month: 10,
  day: 4,
  hour: 10,
  minute: 15,
  second: 40,
  microsecond: 10
}

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

  test('evaluates Meeus formula 7.1 (JD) correctly', () => {
    expect(JD(sampleTime)).toBeCloseTo(2458760.92755, 2)
  })

  test('evaluates Meeus formula 11.1 (T) correctly', () => {
    expect(T(sampleTime)).toBeCloseTo(0.19756132, 2)
  })

  test('evaluates value for _I correctly', () => {
    expect(_I(4, 10, 5)).toBeCloseTo(14.9918364991, 2)
  })

  test('calculates terrestrial oliquity coefficients rewritten to T', () => {
    expect(terrestrialObliquityCoefficients[1]).toBe(-0.013002583333333335)
  })
})
