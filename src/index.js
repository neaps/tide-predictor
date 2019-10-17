import harmonics from './harmonics/index'

const tidePredictionFactory = (constituents, options) => {
  const harmonicsOptions = {
    harmonicConstituents: constituents,
    phaseKey: 'phase_GMT',
    offset: false
  }

  if (typeof options !== 'undefined') {
    Object.keys(harmonicsOptions).forEach(key => {
      if (typeof options[key] !== 'undefined') {
        harmonicsOptions[key] = options[key]
      }
    })
  }

  const tidePrediction = {
    getTimelinePrediction: ({ start, end }) => {
      return harmonics(harmonicsOptions)
        .setTimeSpan(start, end)
        .prediction()
        .getTimelinePrediction()
    },

    getExtremesPrediction: ({ start, end, labels, offsets }) => {
      return harmonics(harmonicsOptions)
        .setTimeSpan(start, end)
        .prediction()
        .getExtremesPrediction(labels, offsets)
    },

    getWaterLevelAtTime: ({ time }) => {
      const endDate = new Date(time.getTime() + 10 * 60 * 1000)
      return harmonics(harmonicsOptions)
        .setTimeSpan(time, endDate)
        .prediction()
        .getTimelinePrediction()[0]
    }
  }

  return tidePrediction
}

export default tidePredictionFactory
