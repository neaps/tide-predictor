![example workflow](https://github.com/neaps/neaps/actions/workflows/test.yml/badge.svg) [![codecov](https://codecov.io/gh/neaps/neaps/branch/main/graph/badge.svg?token=KEJK5NQR5H)](https://codecov.io/gh/neaps/neaps)

# Neaps

A tide prediction engine written in TypeScript.

> [!WARNING]
> **Not for navigational use**
>
> Do not use calculations from this project for navigation, or depend on them in any situation where inaccuracies could result in harm to a person or property. Tide predictions are only as good as the harmonics data available, and these can be inconsistent and vary widely based on the accuracy of the source data and local conditions. The tide predictions do not factor events such as storm surge, wind waves, uplift, tsunamis, or sadly, climate change. 😢

# Installation

```sh
npm install neaps
```

# Usage

## Tide Extremes Prediction

```typescript
import { getExtremesPrediction } from 'neaps'

const prediction = getExtremesPrediction({
  latitude: 26.7, // or `lat`
  longitude: -80.05, // or `lng` or `lon`
  start: new Date('2025-12-17'),
  end: new Date('2025-12-18'),
  datum: 'MLLW' // optional, defaults to MLLW if available
})

console.log(extremes)
// {
//   datum: 'MLLW',
//   station: {
//     id: '8723214',
//     name: 'Fort Lauderdale, FL',
//     // ...
//   },
//   distance: 12.3,
//   extremes: [
//     { time: 2019-01-01T03:12:00.000Z, level: 3.2, high: true, low: false, label: 'High' },
//     { time: 2019-01-01T09:45:00.000Z, level: 0.5, high: false, low: true, label: 'Low' },
//   ]
// }
```

## Get Timeline Prediction

```typescript
import { getTimelinePrediction } from 'neaps'

const timeline = getTimelinePrediction({
  lat: 26.7,
  lon: -80.05,
  start: new Date('2025-12-19T00:00:00-05:00'),
  end: new Date('2025-12-19T01:00:00-05:00')
})

console.log(timeline)
// {
//   datum: 'MLLW',
//   station: {
//     id: 'us-fl-port-of-west-palm-beach',
//     name: 'Port of West Palm Beach',
//     // ...
//   },
//   timeline: [
//     { time: 2025-12-19T05:00:00.000Z, hour: 0, level: 0.07269280868130157 },
//     { time: 2025-12-19T05:10:00.000Z, hour: 0.16666666666666666, level: 0.054517202710722634 },
//     { time: 2025-12-19T05:20:00.000Z, hour: 0.3333333333333333, level: 0.0387568479105333 },
//     { time: 2025-12-19T05:30:00.000Z, hour: 0.5, level: 0.025594147655661648 },
//     { time: 2025-12-19T05:40:00.000Z, hour: 0.6666666666666666, level: 0.015185512178782279 },
//     { time: 2025-12-19T05:50:00.000Z, hour: 0.8333333333333334, level: 0.00765764296563648 },
//     { time: 2025-12-19T06:00:00.000Z, hour: 1, level: 0.0031046829237997287 }
//   ]
// }
```

## Get Water Level at Specific Time

```typescript
import { getWaterLevelAtTime } from 'neaps'

const prediction = getWaterLevelAtTime({
  lat: 26.7,
  lon: -80.05,
  time: new Date('2025-12-19T00:30:00-05:00'),
  datum: 'MSL'
})

console.log(prediction)
// {
//   datum: 'MSL',
//   station: {
//     id: 'us-fl-port-of-west-palm-beach',
//     name: 'Port of West Palm Beach',
//     // ...
//   },
//   time: 2025-12-19T05:30:00.000Z,
//   hour: 0,
//   level: -0.43840585181640557
// }
```

## Finding stations

Neaps uses [@neaps/tide-database](https://github.com/neaps/tide-database) to find station data. You can find stations by location or ID.

### Nearest Station

```typescript
import { nearestStation } from 'neaps'

const station = nearestStation({ lat: 26.7, lon: -80.05 })
console.log(`${station.name} (${station.source.id})`) // Fort Lauderdale, FL (8722588)
```

Once you've found a station, you can get predictions, timeline, or water level at a specific time for that station:

```typescript
// Get extremes prediction for the nearest station
station.getExtremesPrediction({
  start: new Date('2025-12-17'),
  end: new Date('2025-12-18')
})

// Get timeline prediction for the nearest station
station.getTimelinePrediction({
  start: new Date('2025-12-19'),
  end: new Date('2025-12-20')
})

// Get timeline prediction for the nearest station
station.getWaterLevelAt({ time: new Date('2025-12-19T00:30:00-00:00') })
```

### List Nearby Stations

```typescript
import { stationsNear } from 'neaps'

stationsNear({ latitude: 45.6, longitude: -122.7 }, 5).forEach((s) => {
  console.log(
    `${s.name} (${s.source.id}) - ${(s.distance / 1000).toFixed(2)} km away`
  )
})
// Vancouver (9440083) - 3.49 km away
// Portland Morrison Street Bridge (9439221) - 10.24 km away
// KNAPP(THORNES)LNDG, WILLOW BAR (9440171) - 16.34 km away
// Rocky Point (9439189) - 16.93 km away
// WASHOUGAL, COLUMBIA RIVER (9440047) - 24.89 km away
```

### Find station by ID

```typescript
import { findStation } from 'neaps'

// Find station by Neaps ID
findStation('us-wa-seattle') // Seattle

// Find station by source ID (e.g. NOAA)
findStation('9440083') // Vancouver
```
