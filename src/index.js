import Station from './station/index'

class Tide {
  station(stationInfo) {
    return new Station(stationInfo)
  }
}

export default Tide
