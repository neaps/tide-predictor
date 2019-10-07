import astro from '../astronomy'
import { d2r, r2d } from '../constants'

const modulus = (a, b) => {
  return ((a % b) + b) % b
}

const mult = (a, b) => {
  const r = []
  a.forEach((value, index) => {
    r.push(value * b[index])
  })
  return r
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

  getTimelinePrediction() {
    const { baseSpeed, u, f, baseValue } = this.prepare()
    this.setConstituentPhases()
    const results = []
    this.timeline.items.forEach((time, index) => {
      const hour = this.timeline.hours[index]
      const prediction = {
        time: time,
        hour: hour,
        level: this.getLevel(hour, baseSpeed, u[index], f[index], baseValue)
      }

      results.push(prediction)
    })
    return results
  }

  getLevel(hour, modelBaseSpeed, modelU, modelF, modelBaseValue) {
    const amplitudes = []
    let result = 0
    //amplitude*f*np.cos(speed*t + (V0 + u) - phase
    this.constituents.forEach(constituent => {
      const amplitude = constituent.amplitude
      const phase = constituent._phase
      const f = modelF[constituent.name]
      const speed = modelBaseSpeed[constituent.name]
      const u = modelU[constituent.name]
      const V0 = modelBaseValue[constituent.name]
      amplitudes.push(amplitude * f * Math.cos(speed * hour + (V0 + u) - phase))
    })
    //sum up each row
    amplitudes.forEach(item => {
      result += item
    })
    return result
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

    return {
      baseValue: baseValue,
      baseSpeed: baseSpeed,
      u: u,
      f: f
    }
  }
}

export default prediction
