import type { Constituent } from './constituent.js'
import type { AstroData } from '../astronomy/index.js'

export interface ConstituentMember {
  constituent: Constituent
  factor: number
}

export interface CompoundConstituent {
  name: string
  coefficients: number[]
  speed: (astro: AstroData) => number
  value: (astro: AstroData) => number
  u: (astro: AstroData) => number
  f: (astro: AstroData) => number
}

const compoundConstituentFactory = (
  name: string,
  members: ConstituentMember[]
): CompoundConstituent => {
  const coefficients: number[] = []
  members.forEach(({ constituent, factor }) => {
    constituent.coefficients.forEach((coefficient, index) => {
      if (typeof coefficients[index] === 'undefined') {
        coefficients[index] = 0
      }
      coefficients[index] += coefficient * factor
    })
  })

  const compoundConstituent: CompoundConstituent = {
    name,
    coefficients,

    speed: (astro: AstroData): number => {
      let speed = 0
      members.forEach(({ constituent, factor }) => {
        speed += constituent.speed(astro) * factor
      })
      return speed
    },

    value: (astro: AstroData): number => {
      let value = 0
      members.forEach(({ constituent, factor }) => {
        value += constituent.value(astro) * factor
      })
      return value
    },

    u: (astro: AstroData): number => {
      let u = 0
      members.forEach(({ constituent, factor }) => {
        u += constituent.u(astro) * factor
      })
      return u
    },

    f: (astro: AstroData): number => {
      const f: number[] = []
      members.forEach(({ constituent, factor }) => {
        f.push(Math.pow(constituent.f(astro), Math.abs(factor)))
      })
      return f.reduce((previous, value) => previous * value)
    }
  }

  return Object.freeze(compoundConstituent)
}

export default compoundConstituentFactory
