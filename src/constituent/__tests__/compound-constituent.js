import compoundConstituent from '../compound-constituent'
import constituent from '../constituent'
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

//This is a made-up doodson number for a test coefficient
const testConstituentA = new constituent('testa', 'A AYZ ZZA')
const testConstituentB = new constituent('testb', 'Z AYZ ZZA')

const compoundTest = new compoundConstituent('test compound', [
  { constituent: testConstituentA, factor: 1 },
  { constituent: testConstituentB, factor: -1 }
])
describe('compund constituent', () => {
  test('it calculates compound coefficients', () => {
    expect(compoundTest.coefficients).toEqual([1, 0, 0, 0, 0, 0, 0])
  })

  test('it calculates speed', () => {
    expect(compoundTest.speed(testAstro)).toBeCloseTo(14.4920521208, 4)
  })

  test('it calculates value', () => {
    expect(compoundTest.value(testAstro)).toBeCloseTo(268.504355062, 4)
  })

  test('it returns u correctly', () => {
    expect(compoundTest.u(testAstro)).toBe(0)
  })

  test('it returns f correctly', () => {
    expect(compoundTest.f(testAstro)).toBe(1)
  })
})
