import nodeCorrections from '../node-corrections/index'

/**
 * Computes the dot notation of two arrays
 * @param {*} a
 * @param {*} b
 */
const dotArray = (a, b) => {
  const results = []
  a.forEach((value, index) => {
    results.push(value * b[index])
  })
  return results.reduce((total, value) => {
    return total + value
  })
}

class Constituent {
  constructor(name, coefficients, u, f) {
    this.name = name
    if (!coefficients) {
      throw new Error('Coefficient must be defined for a constituent')
    }
    this.coefficients = coefficients

    this.u = typeof u !== 'undefined' ? u : nodeCorrections.uZero
    this.f = typeof f !== 'undefined' ? f : nodeCorrections.fUnity
  }

  value(astro) {
    return dotArray(this.coefficients, this.astronomicValues(astro))
  }

  speed(astro) {
    return dotArray(this.coefficients, this.astronomicSpeed(astro))
  }

  astronimicDoodsonNumber(astro) {
    return [
      astro['T+h-s'],
      astro.s,
      astro.h,
      astro.p,
      astro.N,
      astro.pp,
      astro['90']
    ]
  }

  astronomicSpeed(astro) {
    const results = []
    this.astronimicDoodsonNumber(astro).forEach(number => {
      results.push(number.speed)
    })
    return results
  }

  astronomicValues(astro) {
    const results = []
    this.astronimicDoodsonNumber(astro).forEach(number => {
      results.push(number.value)
    })
    return results
  }
}

export default Constituent
