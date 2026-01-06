import { getExtremesPrediction } from 'neaps'

const options = {
  latitude: 22.24,
  longitude: -75.75,
  start: new Date('2026-01-06T00:00:00Z'),
  end: new Date('2026-01-07T00:00:00Z')
}

const inMeters = getExtremesPrediction(options)
const inFeet = getExtremesPrediction({ ...options, units: 'feet' })

console.table(
  inMeters.extremes.map((extreme, i) => ({
    time: extreme.time,
    type: extreme.label,
    meters: Number(extreme.level.toFixed(2)),
    feet: Number(inFeet.extremes[i].level.toFixed(2))
  }))
)
