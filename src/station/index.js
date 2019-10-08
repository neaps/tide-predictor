import harmonics from '../harmonics'

class station {
  constructor(stationInfo) {
    this.harmonics = []
    this.isSubordinate = false

    if (stationInfo) {
      this.setHarmonicConstituents(stationInfo.HarmonicConstituents)
      this.setIsSubordinate(
        typeof stationInfo.isSubordinate !== 'undefined'
          ? stationInfo.isSubordinate
          : false
      )
    }
  }

  setIsSubordinate(isSubordinate) {
    this.isSubordinate = isSubordinate
  }

  setHarmonicConstituents(constituents) {
    this.harmonics = new harmonics(constituents)
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {Date, unix timestamp} start
   * @param {Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.harmonics.setTimeSpan(start, end)
  }

  getTimelinePrediction() {
    if (!this.harmonics.timelineIsSet()) {
      throw 'Start and end times not set'
    }
    const prediction = this.harmonics.getPrediction()
    return prediction.getTimelinePrediction()
  }
}

export default station
