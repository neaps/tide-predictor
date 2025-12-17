import { describe, it, expect, afterAll } from 'vitest'
import fs from 'fs/promises'
import tidePrediction from '../src/index.js'
import db from '@neaps/tide-stations'
import { createWriteStream } from 'fs'

const noaa = db.filter((station) =>
  station.source.source_url.includes('noaa.gov')
)

// Create a directory for test cache
await fs.mkdir('./.test-cache', { recursive: true })

interface Stat {
  station: string
  count: number
  mae: number
  rmse: number
  bias: number
}

const stats: Stat[] = []

describe('NOAA benchmarks', () => {
  noaa.forEach((station) => {
    it(
      station.source.id,
      async () => {
        const { harmonics, levels } = await getStation(station.source.id)
        const tideStation = tidePrediction(harmonics.HarmonicConstituents)

        // No predictions available
        if (!levels.predictions) return

        let count = 0
        let sumError = 0
        let sumAbsError = 0
        let sumSqError = 0

        levels.predictions.forEach((prediction: { t: string; v: string }) => {
          const expected = parseFloat(prediction.v)

          const { level: actual } = tideStation.getWaterLevelAtTime({
            time: new Date(prediction.t)
          })

          const error = actual - expected

          count += 1
          sumError += error
          sumAbsError += Math.abs(error)
          sumSqError += error * error
        })

        const mae = sumAbsError / count
        const rmse = Math.sqrt(sumSqError / count)
        const bias = sumError / count

        stats.push({ station: station.source.id, count, mae, rmse, bias })
      },
      20000
    )
  })

  afterAll(async () => {
    // Write stats to file for later analysis
    const summary = createWriteStream('noaa-benchmarks.csv')
    summary.write('station,count,mae_m,rmse_m,bias_m\n')
    stats.forEach(({ station, count, mae, rmse, bias }) => {
      summary.write(
        [station, count, mae.toFixed(4), rmse.toFixed(4), bias.toFixed(4)].join(
          ','
        ) + '\n'
      )
    })

    // Baseline expectations based on current performance. The goal should be to move these toward zero over time.
    const maeValues = stats.map((s) => s.mae).sort((a, b) => a - b)
    const medianMAE = maeValues[Math.floor(stats.length / 2)]
    const p90MAE = maeValues[Math.floor(stats.length * 0.9)]
    const p95MAE = maeValues[Math.floor(stats.length * 0.95)]

    expect(medianMAE).toBeLessThan(0.03) // 3 cm
    expect(p90MAE).toBeLessThan(0.06) // 6 cm
    expect(p95MAE).toBeLessThan(0.08) // 8 cm
    expect(stats.length).toBeGreaterThanOrEqual(1178) // Ensure enough stations were tested
  })
})

async function makeRequest(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  return res.json()
}

async function getStation(station: string) {
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
