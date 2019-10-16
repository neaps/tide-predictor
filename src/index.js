import harmonics from './harmonics/index'

const tidePredictionFactory = (constituents, offset) => {
  const tidePrediction = {
    isSubordinate: false,
    getTimelinePrediction: (start, end) => {
      return harmonics(constituents, offset)
        .setTimeSpan(start, end)
        .prediction()
        .getTimelinePrediction()
    },

    getExtremesPrediction: (start, end) => {
      return harmonics(constituents, offset)
        .setTimeSpan(start, end)
        .prediction()
        .getExtremesPrediction()
    },

    getWaterLevelAtTime: time => {
      const endDate = new Date(time.getTime() + 10 * 60 * 1000)
      return harmonics(constituents)
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
