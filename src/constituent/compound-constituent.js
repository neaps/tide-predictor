class compoundConstituent {
  constructor(name, members) {
    this.name = name
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

  u(astro) {
    let u = 0
    this.members.forEach(({ constituent, factor }) => {
      u += constituent.u(astro) * factor
    })
    return u
  }

  f(astro) {
    const f = []
    this.members.forEach(({ constituent, factor }) => {
      f.push(Math.pow(constituent.f(astro), Math.abs(factor)))
    })
    return f.reduce((previous, value) => {
      return previous * value
    })
  }
}

export default compoundConstituent
