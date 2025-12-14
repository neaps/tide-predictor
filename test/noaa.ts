import { describe, it, expect } from 'vitest'
import fs from 'fs/promises'
import tidePrediction from '../src/index.js'

// Create a directory for test cache
await fs.mkdir('./.test-cache', { recursive: true })

const stations = ['9413450', '9411340', '2695535', '8761724', '8410140']

const makeRequest = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  return res.json()
}

const getStation = async (station: string) => {
  const filePath = `./.test-cache/${station}.json`

  try {
    return await fs.readFile(filePath, 'utf-8').then((data) => JSON.parse(data))
  } catch {
    const [harmonics, levels, info] = await Promise.all([
      makeRequest(
        `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${station}/harcon.json?units=metric`
      ),
      makeRequest(
        `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=recent&station=${station}&product=predictions&datum=MTL&time_zone=gmt&units=metric&format=json`
      ),
      makeRequest(
        `https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/${station}/datums.json?units=metric`
      )
    ])

    const data = { harmonics, levels, info }
    await fs.writeFile(filePath, JSON.stringify(data))
    return data
  }
}

describe('Results compare to NOAA', () => {
  stations.forEach((station) => {
    it(`it compares with station ${station}`, async () => {
      const { harmonics, levels } = await getStation(station)
      const tideStation = tidePrediction(harmonics.HarmonicConstituents)
      levels.predictions.forEach((prediction: { t: string; v: string }) => {
        const neapsPrediction = tideStation.getWaterLevelAtTime({
          time: new Date(prediction.t)
        })
        expect(neapsPrediction.level).toBeCloseTo(parseFloat(prediction.v), 0)
      })
    }, 20000)
  })
})
