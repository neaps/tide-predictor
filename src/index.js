import Station from './station/index'

class Tide {
  constructor() {
    this._station = true
  }

  station(stationInfo) {
    return new Station(stationInfo)
  }
}

export default Tide
