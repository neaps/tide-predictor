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
} from '../index'

const sampleTime = {
  year: 2019,
  month: 10,
  day: 4,
  hour: 10,
  minute: 15,
  second: 40,
  microsecond: 10
}

/*
{'pp': AstronomicalParameter(value=283.27697979858613, speed=1.9612154426341654e-06)
xi': AstronomicalParameter(value=11.989946298635664, speed=None)
I': AstronomicalParameter(value=22.811296275568843, speed=None)
P': AstronomicalParameter(value=155.24265065565865, speed=None)
i': AstronomicalParameter(value=5.1449999999999996, speed=0.0)
h': AstronomicalParameter(value=192.82639897760328, speed=0.041068640143510367)
nup': AstronomicalParameter(value=8.8822458121169365, speed=None)
N': AstronomicalParameter(value=102.93412065365243, speed=-0.0022064058456494804)
T+h-s': AstronomicalParameter(value=268.50435506200392, speed=14.492052120843571)
p': AstronomicalParameter(value=167.23259695429431, speed=0.0046418088415145454)
s': AstronomicalParameter(value=258.23871057233191, speed=0.54901651929993922)
nupp': AstronomicalParameter(value=8.8162480626605451, speed=None)
90': AstronomicalParameter(value=90.0, speed=0.0)
omega': AstronomicalParameter(value=23.436722306067253, speed=-1.4832917321024327e-08)
nu': AstronomicalParameter(value=13.028571777192044, speed=None)}*/
describe('astronomy', () => {
  test('complete astronomic calculation', () => {
    const result = astro(sampleTime)
    expect(result.s.value).toBeCloseTo(258.23871057233191, 4)
    expect(result.s.speed).toBeCloseTo(0.54901651929993922, 4)

    expect(result.pp.value).toBeCloseTo(283.27697979858613, 4)
    expect(result.pp.speed).toBeCloseTo(1.9612154426341654e-6, 4)

    expect(result.h.value).toBeCloseTo(192.82639897760328, 4)
    expect(result.h.speed).toBeCloseTo(0.041068640143510367, 4)

    expect(result.xi.value).toBeCloseTo(11.989946298635664, 4)
    expect(result.xi.speed).toBeNull()

    expect(result.I.value).toBeCloseTo(22.811296275568843, 4)
    expect(result.I.speed).toBeNull()

    expect(result.P.value).toBeCloseTo(155.24265065565865, 4)
    expect(result.P.speed).toBeNull()

    expect(result.nupp.value).toBeCloseTo(8.8162480626605451, 4)
    expect(result.nupp.speed).toBeNull()

    expect(result.nu.value).toBeCloseTo(13.028571777192044, 4)
    expect(result.nu.speed).toBeNull()

    expect(result['T+h-s'].value).toBeCloseTo(268.50435506200392, 4)
    expect(result['T+h-s'].speed).toBeCloseTo(14.492052120843571, 4)

    expect(result.omega.value).toBeCloseTo(23.436722306067253, 4)
    expect(result.omega.speed).toBeCloseTo(-1.4832917321024327e-8, 4)
  })

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
    expect(_I(4, 10, 5)).toBeCloseTo(14.9918364991, 4)
  })

  test('evaluates value for _xi correctly', () => {
    expect(_xi(4, 3, 10)).toBeCloseTo(0.911946348144, 4)
  })

  test('evaluates value for _nu correctly', () => {
    expect(_nu(10, 4, 5)).toBeCloseTo(4.45767377718, 4)
  })

  test('evaluates value for _nup correctly', () => {
    expect(_nup(10, 4, 5)).toBeCloseTo(2.13580480226, 4)
  })

  test('evaluates value for _nupp correctly', () => {
    expect(_nupp(10, 4, 5)).toBeCloseTo(1.1146589591, 4)
  })
})
