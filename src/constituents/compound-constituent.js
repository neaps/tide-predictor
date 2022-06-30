const compoundConstituentFactory = (name, members) => {
  const coefficients = []
  members.forEach(({ constituent, factor }) => {
    constituent.coefficients.forEach((coefficient, index) => {
      if (typeof coefficients[index] === 'undefined') {
        coefficients[index] = 0
      }
      coefficients[index] += coefficient * factor
    })
  })

  const compoundConstituent = {
    name,
    coefficients,

    speed: (astro) => {
      let speed = 0
      members.forEach(({ constituent, factor }) => {
        speed += constituent.speed(astro) * factor
      })
      return speed
    },

    value: (astro) => {
      let value = 0
      members.forEach(({ constituent, factor }) => {
        value += constituent.value(astro) * factor
      })
      return value
    },

    u: (astro) => {
      let u = 0
      members.forEach(({ constituent, factor }) => {
        u += constituent.u(astro) * factor
      })
      return u
    },

    f: (astro) => {
      const f = []
      members.forEach(({ constituent, factor }) => {
        f.push(Math.pow(constituent.f(astro), Math.abs(factor)))
      })
      return f.reduce((previous, value) => {
        return previous * value
      })
    }
  }

  return Object.freeze(compoundConstituent)
}

export default compoundConstituentFactory
