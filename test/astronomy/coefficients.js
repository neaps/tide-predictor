import assert from 'assert'
import coefficients, {
  sexagesimalToDecimal
} from '../../src/astronomy/coefficients.js'

describe('astronomy coefficients', () => {
  it('converts a sexagesimal angle into decimal degrees', () => {
    assert.ok(sexagesimalToDecimal(10, 10, 10, 10, 10) === 10.169447225)
    assert.ok(sexagesimalToDecimal(10) === 10)
  })

  it('calculates terrestrial oliquity coefficients rewritten to T', () => {
    assert.ok(coefficients.terrestrialObliquity[1] === -0.013002583333333335)
  })
})
