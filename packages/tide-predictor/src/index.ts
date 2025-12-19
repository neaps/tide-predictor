import harmonics from './harmonics/index.js'
import { default as constituents } from './constituents/index.js'
import type { HarmonicConstituent } from './harmonics/index.js'
import type { TimelinePoint, Extreme } from './harmonics/prediction.js'

export interface TidePredictionOptions {
  phaseKey?: string
  offset?: number | false
}

export interface TimeSpan {
  start: Date
  end: Date
}

export interface ExtremesInput extends TimeSpan {
  labels?: {
    high?: string
    low?: string
  }
  offsets?: {
    height_offset?: {
      high?: number
      low?: number
    }
    time_offset?: {
      high?: number
      low?: number
    }
  }
  timeFidelity?: number
}

export interface TidePrediction {
  getTimelinePrediction: (params: TimeSpan) => TimelinePoint[]
  getExtremesPrediction: (params: ExtremesInput) => Extreme[]
  getWaterLevelAtTime: (params: { time: Date }) => TimelinePoint
}

const tidePredictionFactory = (
  constituents: HarmonicConstituent[],
  options: TidePredictionOptions = {}
): TidePrediction => {
  const harmonicsOptions = {
    harmonicConstituents: constituents,
    phaseKey: 'phase_GMT',
    offset: false as number | false,
    ...options
  }

  const tidePrediction: TidePrediction = {
    getTimelinePrediction: ({ start, end }: TimeSpan): TimelinePoint[] => {
      return harmonics(harmonicsOptions)
        .setTimeSpan(start, end)
        .prediction()
        .getTimelinePrediction()
    },

    getExtremesPrediction: ({
      start,
      end,
      labels,
      offsets,
      timeFidelity
    }: ExtremesInput): Extreme[] => {
      return harmonics(harmonicsOptions)
        .setTimeSpan(start, end)
        .prediction({ timeFidelity })
        .getExtremesPrediction({ labels, offsets })
    },

    getWaterLevelAtTime: ({ time }: { time: Date }): TimelinePoint => {
      const endDate = new Date(time.getTime() + 10 * 60 * 1000)
      return harmonics(harmonicsOptions)
        .setTimeSpan(time, endDate)
        .prediction()
        .getTimelinePrediction()[0]
    }
  }

  return tidePrediction
}

// Make constituents available on factory for reference
tidePredictionFactory.constituents = constituents

export default tidePredictionFactory
export type { HarmonicConstituent, TimelinePoint, Extreme }
