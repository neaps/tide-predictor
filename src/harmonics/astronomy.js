import { d2r, r2d } from './constants'

//in pytide: s2d
//Convert a sexagesimal angle into decimal degrees
const sexagesimalToDecimal = (
  degrees,
  arcmins,
  arcsecs = 0,
  mas = 0,
  muas = 0
) => {
  arcmins = typeof arcmins !== 'undefined' ? arcmins : 0
  arcsecs = typeof arcsecs !== 'undefined' ? arcsecs : 0
  mas = typeof mas !== 'undefined' ? mas : 0
  muas = typeof muas !== 'undefined' ? muas : 0

  return (
    degrees +
    arcmins / 60.0 +
    arcsecs / (60.0 * 60.0) +
    mas / (60.0 * 60.0 * 1e3) +
    muas / (60.0 * 60.0 * 1e6)
  )
}

//Evaluates a polynomial at argument
const polynomial = (coefficients, argument) => {
  let result = []
  coefficients.forEach((coefficient, index) => {
    result.push(coefficient * Math.pow(argument, index))
  })
  return result.reduce((a, b) => {
    return a + b
  })
}

//Evaluates a derivative polynomial at argument
const derivativePolynomial = (coefficients, argument) => {
  let result = []
  coefficients.forEach((coefficient, index) => {
    result.push(coefficient * index * Math.pow(argument, index - 1))
  })
  return result.reduce((a, b) => {
    return a + b
  })
}

//Meeus formula 11.1
const T = t => {
  return (JD(t) - 2451545.0) / 36525
}

// Meeus formula 7.1
const JD = t => {
  const Y = t.year
  const M = t.month
  const D =
    t.day +
    t.hour / 24.0 +
    t.minute / (24.0 * 60.0) +
    t.second / (24.0 * 60.0 * 60.0) +
    t.microsecond / (24.0 * 60.0 * 60.0 * 1e6)
  if (M <= 2) {
    Y = Y - 1
    M = M + 12
  }
  const A = Math.floor(Y / 100.0)
  const B = 2 - A + Math.floor(A / 4.0)
  return (
    Math.floor(365.25 * (Y + 4716)) +
    Math.floor(30.6001 * (M + 1)) +
    D +
    B -
    1524.5
  )
}

//Meeus formula 21.3
const terrestrialObliquityCoefficients = [
  sexagesimalToDecimal(23, 26, 21.448),
  -sexagesimalToDecimal(0, 0, 4680.93),
  -sexagesimalToDecimal(0, 0, 1.55),
  sexagesimalToDecimal(0, 0, 1999.25),
  -sexagesimalToDecimal(0, 0, 51.38),
  -sexagesimalToDecimal(0, 0, 249.67),
  -sexagesimalToDecimal(0, 0, 39.05),
  sexagesimalToDecimal(0, 0, 7.12),
  sexagesimalToDecimal(0, 0, 27.87),
  sexagesimalToDecimal(0, 0, 5.79),
  sexagesimalToDecimal(0, 0, 2.45)
].map((number, index) => {
  return number * Math.pow(1e-2, index)
})

export {
  sexagesimalToDecimal,
  polynomial,
  derivativePolynomial,
  terrestrialObliquityCoefficients,
  T,
  JD
}
