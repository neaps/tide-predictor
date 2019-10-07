import constituents from '../index'
import astro from '../../astronomy'
import moment from 'moment'

const sampleTime = moment({
  years: 2019,
  months: 9,
  date: 4,
  hours: 10,
  minutes: 15,
  seconds: 40,
  milliseconds: 10
})

const testAstro = astro(sampleTime)

describe('Base constituent definitions', () => {
  test('it prepared constituent Sa', () => {
    expect(constituents.Sa.value(testAstro)).toBeCloseTo(192.826398978, 4)
  })

  test('it prepared constituent Ssa', () => {
    expect(constituents.Ssa.value(testAstro)).toBeCloseTo(385.652797955, 4)
  })

  test('has a correct lambda for M3', () => {
    expect(constituents.M3.u(testAstro)).toBeCloseTo(-3.11587643567, 4)
    expect(constituents.M3.f(testAstro)).toBeCloseTo(1.01283073119, 4)
  })
})
