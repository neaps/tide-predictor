const extendedDoodson = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: -8,
  S: -7,
  T: -6,
  U: -5,
  V: -4,
  W: -3,
  X: -2,
  Y: -1,
  Z: 0
}

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

const sortedDoodson = {}
Object.keys(extendedDoodson).forEach(key => {
  sortedDoodson[extendedDoodson[key]] = key
})

class constituent {
  constructor(doodsonNumber, coefficients) {
    if (!doodsonNumber && !coefficients) {
      return false
    }
    if (!doodsonNumber && coefficients) {
      this.coefficients = coefficients
    } else {
      this.coefficients = this.doodsonNumberToCooeficient(doodsonNumber)
    }
  }

  doodsonNumberToCooeficient(doodsonNumber) {
    const coefficeint = []
    doodsonNumber.split('').forEach(letter => {
      if (letter.search(/\w/) === -1) {
        return
      }
      coefficeint.push(extendedDoodson[letter.toUpperCase()])
    })
    return coefficeint
  }

  cooeficientToDoodsonNumber(coefficients) {
    const doodsonNumber = []
    coefficients.forEach(coefficient => {
      doodsonNumber.push(sortedDoodson[coefficient])
    })
    return doodsonNumber.join('')
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
      astro['s'],
      astro['h'],
      astro['p'],
      astro['N'],
      astro['pp'],
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
  //Consider two out of phase constituents which travel at the same speed to
  // be identical
  isEqual(constituent) {
    return this.coefficients === constituent.coefficients
  }

  hash() {
    const hash = []
    this.coefficients.forEach(coefficient => {
      if (coefficient < 0) {
        hash.push(`m${coefficient * -1}`)
      } else {
        hash.push(coefficient)
      }
    })
    return hash.join('')
  }

  u() {
    return 0
  }

  f() {
    return 0
  }
}

export default constituent
export { extendedDoodson, sortedDoodson }
