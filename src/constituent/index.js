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
      this.cooeficients = coefficients
    } else {
      this.cooeficients = this.doodsonNumberToCooeficient(doodsonNumber)
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

  V() {
    //velociy?
    //return np.dot(self.coefficients, self.astro_values(astro))
  }

  speed(astro) {
    //return np.dot(self.coefficients, self.astro_speeds(a))
  }

  astronimicDoodsonNumber(astro) {
    //return [a['T+h-s'], a['s'], a['h'], a['p'], a['N'], a['pp'], a['90']]
  }

  astronomicSpeed(astro) {
    //return np.array([each.speed for each in self.astro_xdo(a)])
  }

  astronomicValues(astro) {
    //return np.array([each.value for each in self.astro_xdo(a)])
  }

  isEqual(constituent) {
    /*#Consider two out of phase constituents which travel at the same speed to
	#be identical
	def __eq__(self, c):
		return np.all(self.coefficients[:-1] == c.coefficients[:-1])*/
  }

  hash() {
    const hash = []
    this.cooeficients.forEach(coefficient => {
      if (coefficient < 0) {
        hash.push(`m${coefficient * -1}`)
      } else {
        hash.push(coefficient)
      }
    })
    return hash.join('')
  }
}

export default constituent
export { extendedDoodson, sortedDoodson }
