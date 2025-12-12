import assert from 'assert'
import closeTo from '../lib/close-to.js'
import astro, {
  polynomial,
  derivativePolynomial,
  JD,
  T,
  _I,
  _xi,
  _nu,
  _nup,
  _nupp
} from '../../src/astronomy/index.js'

const sampleTime = new Date()
sampleTime.setFullYear(2019)
sampleTime.setMonth(9)
sampleTime.setDate(4)
sampleTime.setHours(10)
sampleTime.setMinutes(15)
sampleTime.setSeconds(40)
sampleTime.setMilliseconds(10)

describe('astronomy', () => {
  it('complete astronomic calculation', () => {
    const result = astro(sampleTime)
    closeTo(result.s.value, 258.23871057233191, 4)
    closeTo(result.s.speed, 0.54901651929993922, 4)

    closeTo(result.pp.value, 283.27697979858613, 4)
    closeTo(result.pp.speed, 1.9612154426341654e-6, 4)

    closeTo(result.h.value, 192.82639897760328, 4)
    closeTo(result.h.speed, 0.041068640143510367, 4)

    closeTo(result.xi.value, 11.989946298635664, 4)
    assert.ok(result.xi.speed === null)

    closeTo(result.I.value, 22.811296275568843, 4)
    assert.ok(result.I.speed === null)

    closeTo(result.P.value, 155.24265065565865, 4)
    assert.ok(result.P.speed === null)

    closeTo(result.nupp.value, 8.8162480626605451, 4)
    assert.ok(result.nupp.speed === null)

    closeTo(result.nu.value, 13.028571777192044, 4)
    assert.ok(result.nu.speed === null)

    closeTo(result['T+h-s'].value, 268.50435506200392, 4)
    closeTo(result['T+h-s'].speed, 14.492052120843571, 4)

    closeTo(result.omega.value, 23.436722306067253, 4)
    closeTo(result.omega.speed, -1.4832917321024327e-8, 4)
  })

  it('evaluates a polynomial', () => {
    assert.ok(polynomial([1, 2, 3], 3) === 34)
  })

  it('evaluates derivative polynomials', () => {
    assert.ok(derivativePolynomial([1, 2, 3], 3) === 20)
  })

  it('evaluates Meeus formula 7.1 (JD) correctly', () => {
    sampleTime.setMonth(9)
    closeTo(JD(sampleTime), 2458760.92755, 2)
    // Months of less than 2 go back a year
    sampleTime.setMonth(0)
    closeTo(JD(sampleTime), 2458487.92755, 2)
  })

  it('evaluates Meeus formula 11.1 (T) correctly', () => {
    sampleTime.setMonth(9)
    closeTo(T(sampleTime), 0.19756132, 2)
  })

  it('evaluates value for _I correctly', () => {
    closeTo(_I(4, 10, 5), 14.9918364991, 4)
  })

  it('evaluates value for _xi correctly', () => {
    closeTo(_xi(4, 3, 10), 0.911946348144, 4)
  })

  it('evaluates value for _nu correctly', () => {
    closeTo(_nu(10, 4, 5), 4.45767377718, 4)
  })

  it('evaluates value for _nup correctly', () => {
    closeTo(_nup(10, 4, 5), 2.13580480226, 4)
  })

  it('evaluates value for _nupp correctly', () => {
    closeTo(_nupp(10, 4, 5), 1.1146589591, 4)
  })
})
