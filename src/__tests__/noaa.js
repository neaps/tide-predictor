import fs from 'fs'
import fetch from 'node-fetch'
import tidePrediction from '..'

// Create a directory for test cache
if (!fs.existsSync('./.test-cache')) {
  fs.mkdirSync('./.test-cache')
}

const stations = ['9413450', '9411340', '2695535', '8761724', '8410140']

const getStation = (station, callback) => {
  const filePath = `./.test-cache/${station}.json`
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw new Error('Cannot access test cache')
      }
      callback(JSON.parse(data))
    })
    return
  }
  const stationData = {}
  fetch(
    `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${station}/harcon.json?units=metric`
  )
    .then((response) => {
      return response.json()
    })
    .then((harmonics) => {
      stationData.harmonics = harmonics
      return fetch(
        `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=recent&station=${station}&product=predictions&datum=MTL&time_zone=gmt&units=metric&format=json`
      )
    })
    .then((response) => {
      return response.json()
    })
    .then((levels) => {
      stationData.levels = levels
      return fetch(
        `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${station}/datums.json?units=metric`
      )
    })
    .then((response) => {
      return response.json()
    })
    .then((info) => {
      stationData.info = info
      fs.writeFile(filePath, JSON.stringify(stationData), (error) => {
        if (error) {
          throw new Error('Cannot write to test cache')
        }
        callback(stationData)
      })
    })
}

describe('Results compare to NOAA', () => {
  stations.forEach((station) => {
    test(`it compares with station ${station}`, (done) => {
      getStation(station, ({ harmonics, levels, info }) => {
        let mtl = 0
        let mllw = 0
        info.datums.forEach((datum) => {
          if (datum.name === 'MTL') {
            mtl = datum.value
          }
          if (datum.name === 'MLLW') {
            mllw = datum.value
          }
        })
        const tideStation = tidePrediction(
          harmonics.HarmonicConstituents,
          mtl - mllw
        )
        levels.predictions.forEach((prediction) => {
          const neapsPrediction = tideStation.getWaterLevelAtTime({
            time: new Date(prediction.t),
          })
          expect(parseFloat(prediction.v)).toBeGreaterThanOrEqual(
            neapsPrediction.level - 0.5
          )
          expect(parseFloat(prediction.v)).toBeLessThanOrEqual(
            neapsPrediction.level + 0.5
          )
        })
        done()
      })
    })
  })
})
