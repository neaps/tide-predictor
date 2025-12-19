![example workflow](https://github.com/neaps/tide-predictor/actions/workflows/test.yml/badge.svg) [![codecov](https://codecov.io/gh/neaps/tide-predictor/branch/main/graph/badge.svg?token=KEJK5NQR5H)](https://codecov.io/gh/neaps/tide-predictor)

# Neaps

A tide prediction engine written in TypeScript.

## 🚨Not for navigational use🚨

**Do not use calculations from this project for navigation, or depend on them in any situation where inaccuracies could result in harm to a person or property.**

Tide predictions are only as good as the harmonics data available, and these can be inconsistent and vary widely based on the accuracy of the source data and local conditions.

The tide predictions do not factor events such as storm surge, wind waves, uplift, tsunamis, or sadly, climate change. 😢

# Installation

```sh
npm install neaps
```

# Usage

```typescript
import { getExtremesPrediction } from 'neaps'

const prediction = getExtremesPrediction({
  latitude: 26.7, // or `lat`
  longitude: -80.05, // or `lng` or `lon`
  start: new Date('2025-12-17'),
  end: new Date('2025-12-18'),
  datum: 'MLLW', // optional, defaults to MLLW if available
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
