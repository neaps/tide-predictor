import astro from '../astronomy/index.js'
import { d2r } from '../astronomy/constants.js'
import type { Constituent } from '../constituents/constituent.js'
import type { CompoundConstituent } from '../constituents/compound-constituent.js'

export interface Timeline {
  items: Date[]
  hours: number[]
}

export interface HarmonicConstituent {
  name: string
  amplitude: number
  // This needs refactored to support generics with the `phaseKey` option
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface InternalHarmonicConstituent extends HarmonicConstituent {
  _phase: number
  _model: Constituent | CompoundConstituent
}

export interface TimelinePoint {
  time: Date
  hour: number
  level: number
}

export interface Extreme {
  time: Date
  level: number
  high: boolean
  low: boolean
  label: string
}

export interface ExtremeOffsets {
  height_offset?: {
    high?: number
    low?: number
  }
  time_offset?: {
    high?: number
    low?: number
  }
}

export interface ExtremeLabels {
  high?: string
  low?: string
}

export interface ExtremesOptions {
  labels?: ExtremeLabels
  offsets?: ExtremeOffsets
}

export interface Prediction {
  getExtremesPrediction: (options?: ExtremesOptions) => Extreme[]
  getTimelinePrediction: () => TimelinePoint[]
}

const modulus = (a: number, b: number): number => {
  return ((a % b) + b) % b
}

const addExtremesOffsets = (
  extreme: Extreme,
  offsets?: ExtremeOffsets
): Extreme => {
  if (typeof offsets === 'undefined' || !offsets) {
    return extreme
  }
  if (extreme.high && offsets.height_offset && offsets.height_offset.high) {
    extreme.level *= offsets.height_offset.high
  }
  if (extreme.low && offsets.height_offset && offsets.height_offset.low) {
    extreme.level *= offsets.height_offset.low
  }
  if (extreme.high && offsets.time_offset && offsets.time_offset.high) {
    extreme.time = new Date(
      extreme.time.getTime() + offsets.time_offset.high * 60 * 1000
    )
  }
  if (extreme.low && offsets.time_offset && offsets.time_offset.low) {
    extreme.time = new Date(
      extreme.time.getTime() + offsets.time_offset.low * 60 * 1000
    )
  }
  return extreme
}

const getExtremeLabel = (
  label: 'high' | 'low',
  highLowLabels?: ExtremeLabels
): string => {
  if (
    typeof highLowLabels !== 'undefined' &&
    typeof highLowLabels[label] !== 'undefined'
  ) {
    return highLowLabels[label]!
  }
  const labels = {
    high: 'High',
    low: 'Low'
  }
  return labels[label]
}

interface PredictionFactoryParams {
  timeline: Timeline
  constituents: InternalHarmonicConstituent[]
  start: Date
}

const predictionFactory = ({
  timeline,
  constituents,
  start
}: PredictionFactoryParams): Prediction => {
  const getLevel = (
    hour: number,
    modelBaseSpeed: Record<string, number>,
    modelU: Record<string, number>,
    modelF: Record<string, number>,
    modelBaseValue: Record<string, number>
  ): number => {
    const amplitudes: number[] = []
    let result = 0

    constituents.forEach((constituent) => {
      const amplitude = constituent.amplitude
      const phase = constituent._phase
      const f = modelF[constituent.name]
      const speed = modelBaseSpeed[constituent.name]
      const u = modelU[constituent.name]
      const V0 = modelBaseValue[constituent.name]
      amplitudes.push(amplitude * f * Math.cos(speed * hour + (V0 + u) - phase))
    })
    // sum up each row
    amplitudes.forEach((item) => {
      result += item
    })
    return result
  }

  const prediction: Prediction = {} as Prediction

  prediction.getExtremesPrediction = (options?: ExtremesOptions): Extreme[] => {
    const { labels, offsets } = typeof options !== 'undefined' ? options : {}
    const results: Extreme[] = []
    const { baseSpeed, u, f, baseValue } = prepare()
    let goingUp = false
    let goingDown = false
    let lastLevel = getLevel(0, baseSpeed, u[0], f[0], baseValue)
    timeline.items.forEach((time, index) => {
      const hour = timeline.hours[index]
      const level = getLevel(hour, baseSpeed, u[index], f[index], baseValue)
      // Compare this level to the last one, if we
      // are changing angle, then the last one was high or low
      if (level > lastLevel && goingDown) {
        results.push(
          addExtremesOffsets(
            {
              time: timeline.items[index - 1],
              level: lastLevel,
              high: false,
              low: true,
              label: getExtremeLabel('low', labels)
            },
            offsets
          )
        )
      }
      if (level < lastLevel && goingUp) {
        results.push(
          addExtremesOffsets(
            {
              time: timeline.items[index - 1],
              level: lastLevel,
              high: true,
              low: false,
              label: getExtremeLabel('high', labels)
            },
            offsets
          )
        )
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

  prediction.getTimelinePrediction = (): TimelinePoint[] => {
    const results: TimelinePoint[] = []
    const { baseSpeed, u, f, baseValue } = prepare()
    timeline.items.forEach((time, index) => {
      const hour = timeline.hours[index]
      const prediction: TimelinePoint = {
        time,
        hour,
        level: getLevel(hour, baseSpeed, u[index], f[index], baseValue)
      }

      results.push(prediction)
    })
    return results
  }

  const prepare = () => {
    const baseAstro = astro(start)

    const baseValue: Record<string, number> = {}
    const baseSpeed: Record<string, number> = {}
    const u: Record<string, number>[] = []
    const f: Record<string, number>[] = []
    constituents.forEach((constituent) => {
      const value = constituent._model.value(baseAstro)
      const speed = constituent._model.speed(baseAstro)
      baseValue[constituent.name] = d2r * value
      baseSpeed[constituent.name] = d2r * speed
    })
    timeline.items.forEach((time) => {
      const uItem: Record<string, number> = {}
      const fItem: Record<string, number> = {}
      const itemAstro = astro(time)
      constituents.forEach((constituent) => {
        const constituentU = modulus(constituent._model.u(itemAstro), 360)

        uItem[constituent.name] = d2r * constituentU
        fItem[constituent.name] = modulus(constituent._model.f(itemAstro), 360)
      })
      u.push(uItem)
      f.push(fItem)
    })

    return {
      baseValue,
      baseSpeed,
      u,
      f
    }
  }

  return Object.freeze(prediction)
}

export default predictionFactory
