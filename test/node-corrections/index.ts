import assert from 'assert'
import closeTo from '../lib/close-to.js'
import nodeCorrections from '../../src/node-corrections/index.js'

const testItems = {
  i: {
    value: 5
  },
  I: { value: 6 },
  omega: { value: 3 },
  nu: { value: 4 },
  nup: { value: 4 },
  nupp: { value: 2 },
  P: { value: 14 },
  xi: {
    value: 4
  }
}

describe('Node corrections', () => {
  it('have correct unity', () => {
    assert.ok(nodeCorrections.fUnity() === 1)
  })

  it('calculates Schureman equations 73, 65 (f_Mm)', () => {
    closeTo(nodeCorrections.fMm(testItems), 0.999051998091, 4)
  })

  it('calculates Schureman equations 74, 66 (f_Mf)', () => {
    closeTo(nodeCorrections.fMf(testItems), 4.00426673883, 4)
  })

  it('calculates Schureman equations 75, 67 (f_O1)', () => {
    closeTo(nodeCorrections.fO1(testItems), 2.00076050158, 4)
  })

  it('calculates Schureman equations 76, 68 (f_J1)', () => {
    closeTo(nodeCorrections.fJ1(testItems), 2.0119685329, 4)
  })

  it('calculates Schureman equations 77, 69 (f_OO1)', () => {
    closeTo(nodeCorrections.fOO1(testItems), 8.01402871709, 4)
  })

  it('calculates Schureman equations 78, 70 (f_M2)', () => {
    closeTo(nodeCorrections.fM2(testItems), 0.999694287563, 4)
  })

  it('calculates Schureman equations 227, 226, 68 (f_K1)', () => {
    closeTo(nodeCorrections.fK1(testItems), 1.23843964182, 4)
  })

  it('calculates Schureman equations 215, 213, 204 (f_L2)', () => {
    closeTo(nodeCorrections.fL2(testItems), 0.98517860327, 4)
  })

  it('calculates Schureman equations 235, 234, 71 (f_K2)', () => {
    closeTo(nodeCorrections.fK2(testItems), 1.09775430048, 4)
  })

  it('calculates Schureman equations 206, 207, 195 (f_M1)', () => {
    closeTo(nodeCorrections.fM1(testItems), 3.90313810168, 4)
  })

  it('calculates e.g. Schureman equation 149 (f_Modd)', () => {
    closeTo(nodeCorrections.fModd(testItems, 3), 0.999541466395, 4)
  })

  it('has a zero for u_zero', () => {
    assert.ok(nodeCorrections.uZero() === 0.0)
  })

  it('calculates u_Mf', () => {
    assert.ok(nodeCorrections.uMf(testItems) === -8.0)
  })

  it('calculates u_O1', () => {
    assert.ok(nodeCorrections.uO1(testItems) === 4.0)
  })

  it('calculates u_J1', () => {
    assert.ok(nodeCorrections.uJ1(testItems) === -4)
  })

  it('calculates u_OO1', () => {
    assert.ok(nodeCorrections.uOO1(testItems) === -12.0)
  })

  it('calculates u_M2', () => {
    assert.ok(nodeCorrections.uM2(testItems) === 0.0)
  })

  it('calculates u_K1', () => {
    assert.ok(nodeCorrections.uK1(testItems) === -4)
  })

  it('calculates u_L2', () => {
    closeTo(nodeCorrections.uL2(testItems), -0.449812364499, 4)
  })

  it('calculates u_K2', () => {
    assert.ok(nodeCorrections.uK2(testItems) === -4.0)
  })

  it('calculates u_K2', () => {
    assert.ok(nodeCorrections.uK2(testItems) === -4.0)
  })

  it('calculates u_M1', () => {
    closeTo(nodeCorrections.uM1(testItems), 7.09154172301, 4)
  })

  it('calculates u_Modd', () => {
    assert.ok(nodeCorrections.uModd(testItems, 3) === 0)
  })
})
