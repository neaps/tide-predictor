import { polynomial, derivativePolynomial, JD, T, _I, _xi } from '../index'

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
  test('evaluates a polynomial', () => {
    expect(polynomial([1, 2, 3], 3)).toBe(34)
  })

  test('evaluates derivative polynomials', () => {
    expect(derivativePolynomial([1, 2, 3], 3)).toBe(20)
  })

  test('evaluates Meeus formula 7.1 (JD) correctly', () => {
    sampleTime.month = 10
    expect(JD(sampleTime)).toBeCloseTo(2458760.92755, 2)
    //Months of less than 2 go back a year
    sampleTime.month = 1
    expect(JD(sampleTime)).toBeCloseTo(2458487.92755, 2)
  })

  test('evaluates Meeus formula 11.1 (T) correctly', () => {
    sampleTime.month = 10
    expect(T(sampleTime)).toBeCloseTo(0.19756132, 2)
  })

  test('evaluates value for _I correctly', () => {
    expect(_I(4, 10, 5)).toBeCloseTo(14.9918364991, 2)
  })

  test('evaluates value for _xi correctly', () => {
    expect(_xi(4, 3, 10)).toBeCloseTo(0.911946348144, 2)
  })
})
