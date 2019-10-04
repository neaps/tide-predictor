import coefficients, { sexagesimalToDecimal } from '../coefficients'

describe('astronomy coefficients', () => {
  test('converts a sexagesimal angle into decimal degrees', () => {
    expect(sexagesimalToDecimal(10, 10, 10, 10, 10)).toBe(10.169447225)
    expect(sexagesimalToDecimal(10)).toBe(10)
  })

  test('calculates terrestrial oliquity coefficients rewritten to T', () => {
    expect(coefficients.terrestrialObliquity[1]).toBe(-0.013002583333333335)
  })
})
