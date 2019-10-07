import astro from '../astronomy'
import { d2r, r2d } from '../constants'

const modulus = (a, b) => {
  return ((a % b) + b) % b
}
class prediction {
  constructor({ timeline, constituents, start }) {
    this.timeline = timeline
    this.constituents = constituents
    this.start = start
    this.phaseType = 'GMT'
  }

  setPhaseType(phaseType) {
    phaseType = typeof phaseType !== 'undefined' ? phaseType : 'GMT'
    if (['local', 'GMT'].indexOf(phaseType) == -1) {
      throw 'phase type must be local or GMT'
    }
    this.phaseType = phaseType
  }

  setConstituentPhases() {
    const phaseKey = `phase_${this.phaseType}`
    this.constituents = this.constituents.map(constituent => {
      constituent._phase = d2r * constituent[phaseKey]
      return constituent
    })
  }

  get(phaseType) {
    const { speed, u, f, V0 } = this.prepare()
    this.setModelPhases()
  }

  prepare(radians) {
    radians = typeof radians !== 'undefined' ? radians : true
    const baseAstro = astro(this.start)

    let baseValue = {}
    const baseSpeed = {}
    const u = []
    const f = []
    this.constituents.forEach(constituent => {
      const value = constituent._model.value(baseAstro)
      const speed = constituent._model.speed(baseAstro)
      baseValue[constituent.name] = radians ? d2r * value : value
      baseSpeed[constituent.name] = radians ? d2r * speed : speed
    })
    this.timeline.items.forEach(time => {
      const uItem = {}
      const fItem = {}
      const itemAstro = astro(time)
      this.constituents.forEach(constituent => {
        const constituentU = modulus(constituent._model.u(itemAstro), 360)

        uItem[constituent.name] = radians ? d2r * constituentU : constituentU
        fItem[constituent.name] = modulus(constituent._model.f(itemAstro), 360)
      })
      u.push(uItem)
      f.push(fItem)
    })

    if (radians) {
    }

    return {
      baseValue: baseValue,
      baseSpeed: baseSpeed,
      u: u,
      f: f
    }
  }
}

export default prediction
