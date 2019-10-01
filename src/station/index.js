class station {
  constructor(stationInfo) {
    this.harmonics = []
    this.requiredFields = [
      'name',
      'amplitude',
      'phase_GMT',
      'phase_local',
      'speed'
    ]
    if (stationInfo) {
      this.setHarmonics(stationInfo.HarmonicConstituents)
    }
  }

  setHarmonics(harmonics) {
    if (!Array.isArray(harmonics)) {
      throw 'Harmonics data is not an array'
    }
    harmonics.forEach(harmonicEntry => {
      this.requiredFields.forEach(field => {
        if (typeof harmonicEntry[field] === 'undefined') {
          throw `Harmonic entry missing field ${field}`
        }
      })
    })
    this.harmonics = harmonics
  }

  getHarmonics() {
    return this.harmonics
  }
}

export default station
