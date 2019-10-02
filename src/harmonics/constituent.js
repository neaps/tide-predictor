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
}

export default constituent
export { extendedDoodson, sortedDoodson }
