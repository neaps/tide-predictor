import harmonics from './harmonics/index'

const tidePredictionFactory = (constituents, options) => {
  let phaseKey = 'phase_GMT'
  let offset = false
  if (typeof options !== 'undefined') {
    phaseKey =
      typeof options.phaseKey !== 'undefined' ? options.phaseKey : 'phase_GMT'
    offset = typeof options.offset !== 'undefined' ? options.offset : false
  }
  const tidePrediction = {
    isSubordinate: false,
    getTimelinePrediction: (start, end) => {
      return harmonics(constituents, phaseKey, offset)
        .setTimeSpan(start, end)
        .prediction()
        .getTimelinePrediction()
    },

    getExtremesPrediction: (start, end) => {
      return harmonics(constituents, phaseKey, offset)
        .setTimeSpan(start, end)
        .prediction()
        .getExtremesPrediction()
    },

    getWaterLevelAtTime: time => {
      const endDate = new Date(time.getTime() + 10 * 60 * 1000)
      return harmonics(constituents, phaseKey, offset)
        .setTimeSpan(time, endDate)
        .prediction()
        .getTimelinePrediction()[0]
    }
  }

  tidePrediction.setIsSubordinate = newStatus => {
    tidePrediction.isSubordinate = newStatus
    return tidePrediction
  }

  return tidePrediction
}

export default tidePredictionFactory
