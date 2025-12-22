import { expect } from 'vitest'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { createWriteStream } from 'fs'
import { join } from 'path'
import { findStation } from 'neaps'
import db from '@neaps/tide-database'

const __dirname = new URL('.', import.meta.url).pathname

const stations = db
  .filter(
    (station) =>
      // TODO: Update this to test subordinate stations too.
      // Need to switch from `getWaterLevelAtTime` to `getExtremesPrediction` and compare time/level.
      station.type === 'reference' &&
      station.source.source_url.includes('noaa.gov')
  )
  .map((station) => station.source.id)
  .filter(() => Math.random() < 0.1)

// Create a directory for test cache
await mkdir('./.test-cache', { recursive: true })

interface Stat {
  station: string
  count: number
  mae: number
  rmse: number
  bias: number
}

const stats: Stat[] = []

console.log(`Testing tide predictions against ${stations.length} NOAA stations`)

for (const id of stations) {
  const station = findStation(id)

  // Catch error and return no levels if failing to fetch data. There is a test later to ensure enough stations are tested.
  const { levels } = await fetchNOAAdata(station.source.id).catch(() => ({
    levels: {}
  }))

  // No predictions available
  if (!levels.predictions) continue

  let count = 0
  let sumError = 0
  let sumAbsError = 0
  let sumSqError = 0

  levels.predictions.forEach((prediction: { t: string; v: string }) => {
    const expected = parseFloat(prediction.v)

    const { level: actual } = station.getWaterLevelAtTime({
      time: new Date(prediction.t),
      datum: false
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
  process.stdout.write('.')
}

// Write stats to file for later analysis
const summary = createWriteStream(join(__dirname, 'noaa.csv'))
summary.write('station,count,mae_m,rmse_m,bias_m\n')
stats.forEach(({ station, count, mae, rmse, bias }) => {
  summary.write(
    [station, count, mae.toFixed(4), rmse.toFixed(4), bias.toFixed(4)].join(
      ','
    ) + '\n'
  )
})
summary.end()

// Baseline expectations based on current performance. The goal should be to move these toward zero over time.
const maeValues = stats.map((s) => s.mae).sort((a, b) => a - b)
const p50MAE = maeValues[Math.floor(stats.length / 2)]
const p90MAE = maeValues[Math.floor(stats.length * 0.9)]
const p95MAE = maeValues[Math.floor(stats.length * 0.95)]

console.log('\n', { p50MAE, p90MAE, p95MAE })

expect(p50MAE, 'MAE p50').toBeLessThan(0.03) // 3 cm
expect(p90MAE, 'MAE p90').toBeLessThan(0.06) // 6 cm
expect(p95MAE, 'MAE p95').toBeLessThan(0.08) // 8 cm

async function makeRequest(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  return res.json()
}

async function fetchNOAAdata(station: string) {
  const filePath = `./.test-cache/${station}.json`

  try {
    return await readFile(filePath, 'utf-8').then((data) => JSON.parse(data))
  } catch {
    const levels = await makeRequest(
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=recent&station=${station}&product=predictions&datum=MTL&time_zone=gmt&units=metric&format=json`
    )

    const data = { levels }
    await writeFile(filePath, JSON.stringify(data))
    return data
  }
}
