import assert from 'assert'
import closeTo from '../lib/close-to.js'
import constituent, {
  astronimicDoodsonNumber,
  astronomicSpeed,
  astronomicValues
} from '../../src/constituents/constituent.js'
import astro from '../../src/astronomy/index.js'

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
  it('it throws error if missing coefficients', () => {
    let errorMessage = false
    try {
      const a = constituent('fail') // eslint-disable-line
    } catch (error) {
      errorMessage = error
    }
    assert.ok(
      errorMessage.message === 'Coefficient must be defined for a constituent'
    )
  })

  it('it fetches astronimic Doodson Number values', () => {
    const values = astronimicDoodsonNumber(testAstro)
    assert.ok(values[0].value === testAstro['T+h-s'].value)
  })

  it('it fetches astronimic speed', () => {
    const values = astronomicSpeed(testAstro)
    assert.ok(values[0] === testAstro['T+h-s'].speed)
  })

  it('it fetches astronimic values', () => {
    const values = astronomicValues(testAstro)
    assert.ok(values[0] === testAstro['T+h-s'].value)
  })

  it('it computes constituent value', () => {
    closeTo(testConstituent.value(testAstro), 423.916666657, 4)
  })

  it('it computes constituent speed', () => {
    assert.ok(testConstituent.speed(testAstro) === 15)
  })

  it('it returns u correctly', () => {
    assert.ok(testConstituent.u(testAstro) === 0)
  })

  it('it returns f correctly', () => {
    assert.ok(testConstituent.f(testAstro) === 1)
  })
})
