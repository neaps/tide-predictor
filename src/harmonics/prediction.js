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
    this.setPhaseType('GMT')
  }

  setPhaseType(phaseType) {
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

  getExtremesPrediction() {
    const results = []
    const { baseSpeed, u, f, baseValue } = this.prepare()
    this.setConstituentPhases()
    let goingUp = false
    let goingDown = false
    let slack = false
    let lastLevel = this.getLevel(0, baseSpeed, u[0], f[0], baseValue)
    this.timeline.items.forEach((time, index) => {
      const hour = this.timeline.hours[index]
      const level = this.getLevel(
        hour,
        baseSpeed,
        u[index],
        f[index],
        baseValue
      )
      //Compare this level to the last one, if we
      //are changing angle, then the last one was high or low
      if (level > lastLevel && goingDown) {
        results.push({
          time: this.timeline.items[index - 1],
          hour: this.timeline.hours[index - 1],
          level: lastLevel,
          high: false,
          low: true,
          label: this.getExtremeLabel('high')
        })
      }
      if (level < lastLevel && goingUp) {
        results.push({
          time: this.timeline.items[index - 1],
          hour: this.timeline.hours[index - 1],
          level: lastLevel,
          high: true,
          low: false,
          label: this.getExtremeLabel('low')
        })
      }
      if (level > lastLevel) {
        goingUp = true
        goingDown = false
      }
      if (level < lastLevel) {
        goingUp = false
        goingDown = true
      }
      lastLevel = level
    })
    return results
  }
  // here for i18n
  getExtremeLabel(label) {
    const labels = {
      high: 'High',
      low: 'Low'
    }
    return labels[label]
  }

  getTimelinePrediction() {
    const results = []
    const { baseSpeed, u, f, baseValue } = this.prepare()
    this.setConstituentPhases()
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
