import nodeCorrections from '../index'

const testItems = {
  i: {
    value: 5
  },
  I: { value: 6 },
  omega: { value: 3 },
  nu: { value: 4 },
  P: { value: 14 }
}

describe('Node corrections', () => {
  test('have correct unity', () => {
    expect(nodeCorrections.unity()).toBe(1)
  })

  test('calculates Schureman equations 73, 65 (f_Mm)', () => {
    expect(nodeCorrections.f_Mm(testItems)).toBeCloseTo(0.999051998091, 4)
  })

  test('calculates Schureman equations 74, 66 (f_Mf)', () => {
    expect(nodeCorrections.f_Mf(testItems)).toBeCloseTo(4.00426673883, 4)
  })

  test('calculates Schureman equations 75, 67 (f_O1)', () => {
    expect(nodeCorrections.f_O1(testItems)).toBeCloseTo(2.00076050158, 4)
  })

  test('calculates Schureman equations 76, 68 (f_J1)', () => {
    expect(nodeCorrections.f_J1(testItems)).toBeCloseTo(2.0119685329, 4)
  })

  test('calculates Schureman equations 77, 69 (f_OO1)', () => {
    expect(nodeCorrections.f_OO1(testItems)).toBeCloseTo(8.01402871709, 4)
  })

  test('calculates Schureman equations 78, 70 (f_M2)', () => {
    expect(nodeCorrections.f_M2(testItems)).toBeCloseTo(0.999694287563, 4)
  })

  test('calculates Schureman equations 227, 226, 68 (f_K1)', () => {
    expect(nodeCorrections.f_K1(testItems)).toBeCloseTo(1.23843964182, 4)
  })

  test('calculates Schureman equations 215, 213, 204 (f_L2)', () => {
    expect(nodeCorrections.f_L2(testItems)).toBeCloseTo(0.98517860327, 4)
  })

  test('calculates Schureman equations 235, 234, 71 (f_K2)', () => {
    expect(nodeCorrections.f_K2(testItems)).toBeCloseTo(1.09775430048, 4)
  })

  test('calculates Schureman equations 206, 207, 195 (f_M1)', () => {
    expect(nodeCorrections.f_M1(testItems)).toBeCloseTo(3.90313810168, 4)
  })

  test('calculates e.g. Schureman equation 149 (f_Modd)', () => {
    expect(nodeCorrections.f_Modd(testItems, 3)).toBeCloseTo(0.999541466395, 4)
  })
})
