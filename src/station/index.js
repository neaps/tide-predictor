import Harmonics from '../harmonics/index'

class Station {
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
    this.harmonics = new Harmonics(constituents)
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
      throw new Error('Start and end times not set')
    }
    const prediction = this.harmonics.getPrediction()
    return prediction.getTimelinePrediction()
  }

  getExtremesPrediction() {
    if (!this.harmonics.timelineIsSet()) {
      throw new Error('Start and end times not set')
    }
    const prediction = this.harmonics.getPrediction()
    return prediction.getExtremesPrediction()
  }
}

export default Station
