import { getExtremesPrediction } from 'neaps'

const prediction = getExtremesPrediction({
  latitude: 26.7, // or `lat`
  longitude: -80.05, // or `lng` or `lon`
  start: new Date('2025-12-17'),
  end: new Date('2025-12-18'),
  datum: 'MLLW', // optional, defaults to MLLW if available
  units: 'meters' // optional, defaults to 'meters', can also be 'feet'
})

console.log(prediction)
