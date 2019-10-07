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
  }

  at(time) {
    const a = astro(time.toObject())
    const partition = 240.0
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
        if (constituent.name === 'M2' && u.length == 0) {
          console.log(modulus(d2r * constituentU, 360))
        }
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
