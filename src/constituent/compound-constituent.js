import constituent from './constituent'

class compoundConstituent {
  constructor(members) {
    this.members = members
    const coefficients = []
    members.forEach(({ constituent, factor }) => {
      constituent.coefficients.forEach((coefficient, index) => {
        if (typeof coefficients[index] === 'undefined') {
          coefficients[index] = 0
        }
        coefficients[index] += coefficient * factor
      })
    })
    this.coefficients = coefficients
  }

  speed(astro) {
    let speed = 0
    this.members.forEach(({ constituent, factor }) => {
      speed += constituent.speed(astro) * factor
    })
    return speed
  }

  value(astro) {
    let value = 0
    this.members.forEach(({ constituent, factor }) => {
      value += constituent.value(astro) * factor
    })
    return value
  }

  u() {
    return 0
  }

  f() {
    return 0
  }
}

export default compoundConstituent
