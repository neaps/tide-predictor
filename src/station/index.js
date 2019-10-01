import harmonics from '../harmonics'

class station {
  constructor(stationInfo) {
    this.harmonics = []
    this.isSubordinate = false

    if (stationInfo) {
      this.setHarmonicConstituents(stationInfo.HarmonicConstituents)
      if (typeof stationInfo.isSubordinate !== 'undefined') {
        this.setIsSubordinate(stationInfo.isSubordinate)
      }
    }
  }

  setIsSubordinate(isSubordinate) {
    this.isSubordinate = isSubordinate
  }

  setHarmonicConstituents(constituents) {
    this.harmonics = new harmonics(constituents)
  }

  getHarmonics() {
    return this.harmonics
  }
}

export default station
