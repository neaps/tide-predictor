import constituents from '../index'
import astro from '../../astronomy'

const sampleTime = new Date()
sampleTime.setFullYear(2019)
sampleTime.setMonth(9)
sampleTime.setDate(4)
sampleTime.setHours(10)
sampleTime.setMinutes(15)
sampleTime.setSeconds(40)
sampleTime.setMilliseconds(10)

const testAstro = astro(sampleTime)

describe('Base constituent definitions', () => {
  test('it prepared constituent SA', () => {
    expect(constituents.SA.value(testAstro)).toBeCloseTo(192.826398978, 4)
  })

  test('it prepared constituent SSA', () => {
    expect(constituents.SSA.value(testAstro)).toBeCloseTo(385.652797955, 4)
  })

  test('it prepared constituent M2', () => {
    expect(constituents.M2.value(testAstro)).toBeCloseTo(537.008710124, 4)
    expect(constituents.M2.u(testAstro)).toBeCloseTo(-2.07725095711, 4)
    expect(constituents.M2.f(testAstro)).toBeCloseTo(1.00853563237, 4)
  })

  test('has a correct lambda for M3', () => {
    expect(constituents.M3.u(testAstro)).toBeCloseTo(-3.11587643567, 4)
    expect(constituents.M3.f(testAstro)).toBeCloseTo(1.01283073119, 4)
  })
})
