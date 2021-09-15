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

const astronimicDoodsonNumber = (astro) => {
  return [
    astro['T+h-s'],
    astro.s,
    astro.h,
    astro.p,
    astro.N,
    astro.pp,
    astro['90'],
  ]
}

const astronomicSpeed = (astro) => {
  const results = []
  astronimicDoodsonNumber(astro).forEach((number) => {
    results.push(number.speed)
  })
  return results
}

const astronomicValues = (astro) => {
  const results = []
  astronimicDoodsonNumber(astro).forEach((number) => {
    results.push(number.value)
  })
  return results
}

const constituentFactory = (name, coefficients, u, f) => {
  if (!coefficients) {
    throw new Error('Coefficient must be defined for a constituent')
  }

  const constituent = {
    name: name,

    coefficients: coefficients,

    value: (astro) => {
      return dotArray(coefficients, astronomicValues(astro))
    },

    speed(astro) {
      return dotArray(coefficients, astronomicSpeed(astro))
    },

    u: typeof u !== 'undefined' ? u : nodeCorrections.uZero,

    f: typeof f !== 'undefined' ? f : nodeCorrections.fUnity,
  }

  return Object.freeze(constituent)
}

export default constituentFactory

export { astronimicDoodsonNumber, astronomicSpeed, astronomicValues }
