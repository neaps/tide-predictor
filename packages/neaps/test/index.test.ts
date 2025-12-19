import stations from '@neaps/tide-stations'
import {
  getExtremesPrediction,
  nearestStation,
  findStation,
  useStation,
  getTimelinePrediction,
  getWaterLevelAtTime
} from '../src/index.js'
import { describe, test, expect } from 'vitest'

// FIXME: this is required for these tests to pass. I can't figure out how to get accurate
// predictions for a station in a non-UTC timezone without this.
process.env.TZ = 'UTC'

describe('getExtremesPrediction', () => {
  test('gets extremes from nearest station', () => {
    const extremes = getExtremesPrediction({
      lat: 26.7,
      lon: -80.05,
      start: new Date('2025-12-18T00:00:00-05:00'),
      end: new Date('2025-12-19T00:00:00-05:00'),
      timeFidelity: 6,
      datum: 'MLLW'
    })

    expect(extremes.station.id).toEqual('us-fl-port-of-west-palm-beach')
    expect(extremes.datum).toBe('MLLW')

    const { predictions } = extremes
    expect(predictions.length).toBe(4)
    expect(predictions[0].time).toEqual(new Date('2025-12-18T05:29:48.000Z'))
    expect(predictions[0].level).toBeCloseTo(0.02, 2)
    expect(predictions[0].high).toBe(false)
    expect(predictions[0].low).toBe(true)
    expect(predictions[0].label).toBe('Low')
  })
})

describe('getTimelinePrediction', () => {
  test('gets timeline from nearest station', () => {
    const timeline = getTimelinePrediction({
      lat: 26.7,
      lon: -80.05,
      start: new Date('2025-12-19T00:00:00-05:00'),
      end: new Date('2025-12-19T01:00:00-05:00')
    })

    expect(timeline.station.id).toEqual('us-fl-port-of-west-palm-beach')
    expect(timeline.datum).toBe('MLLW')
    expect(timeline.timeline.length).toBe(7) // Every 10 minutes for 1 hour = 7 points
  })
})

describe('getWaterLevelAtTime', () => {
  test('gets water level at specific time from nearest station', () => {
    const waterLevel = getWaterLevelAtTime({
      lat: 26.7,
      lon: -80.05,
      time: new Date('2025-12-19T00:30:00-05:00'),
      datum: 'MSL'
    })

    expect(waterLevel.station.id).toEqual('us-fl-port-of-west-palm-beach')
    expect(waterLevel.datum).toBe('MSL')
    expect(waterLevel.time).toEqual(new Date('2025-12-19T05:30:00.000Z'))
    expect(typeof waterLevel.level).toBe('number')
  })
})

describe('for a specific station', () => {
  const station = nearestStation({ lat: 45.6, lon: -122.7 })

  describe('getExtremesPrediction', () => {
    test('can return extremes from station', () => {
      const station = nearestStation({ lat: 26.7, lon: -80.05 })

      const start = new Date('2025-12-17T00:00:00-05:00')
      const end = new Date('2025-12-18T05:00:00-05:00')

      const { predictions } = station.getExtremesPrediction({
        start,
        end,
        timeFidelity: 6,
        datum: 'MLLW'
      })

      expect(predictions.length).toBe(4)
      expect(predictions[0].time).toEqual(new Date('2025-12-17T11:23:06.000Z'))
      expect(predictions[0].level).toBeCloseTo(0.9, 1)
      expect(predictions[0].high).toBe(true)
      expect(predictions[0].low).toBe(false)
      expect(predictions[0].label).toBe('High')
    })
  })

  describe('getTimelinePrediction', () => {
    test('gets timeline', () => {
      const prediction = station.getTimelinePrediction({
        start: new Date('2025-12-19T00:00:00Z'),
        end: new Date('2025-12-19T01:00:00Z')
      })
      // Every 10 minutes for 1 hour = 7 points
      expect(prediction.timeline.length).toBe(7)
      expect(prediction.datum).toBe('MLLW')
    })
  })

  describe('getWaterLevelAtTime', () => {
    test('gets water level at specific time', () => {
      const prediction = station.getWaterLevelAtTime({
        time: new Date('2025-12-19T00:30:00Z')
      })
      expect(prediction.time).toEqual(new Date('2025-12-19T00:30:00Z'))
      expect(prediction.datum).toBe('MLLW')
      expect(typeof prediction.level).toBe('number')
    })
  })
})

describe('nearestStation', () => {
  test('finds the nearest station', () => {
    const station = nearestStation({ lat: 26.7, lon: -80.05 })
    expect(station.metadata.source.id).toBe('8722588')
    expect(station.metadata.latitude).toBeCloseTo(26.77)
    expect(station.metadata.longitude).toBeCloseTo(-80.0517)
  })
  ;[
    { lat: 26.7, lon: -80.05 },
    { lat: 26.7, lng: -80.05 },
    { latitude: 26.7, longitude: -80.05 }
  ].forEach((position) => {
    test(`finds station with ${Object.keys(position).join('/')}`, () => {
      const station = nearestStation(position)
      expect(station.metadata.id).toEqual('us-fl-port-of-west-palm-beach')
    })
  })
})

describe('findStation', () => {
  test('raises error for unknown station', () => {
    expect(() => findStation('unknown')).toThrow('Station not found: unknown')
  })

  test('finds station by id', () => {
    const station = findStation('us-fl-ankona-indian-river')
    expect(station).toBeDefined()
    expect(station.metadata.id).toBe('us-fl-ankona-indian-river')
    expect(station.getExtremesPrediction).toBeDefined()
  })

  test('finds station by source id', () => {
    const station = findStation('8443970')
    expect(station).toBeDefined()
    expect(station.metadata.id).toBe('us-ma-boston')
    expect(station.getExtremesPrediction).toBeDefined()
  })
})

describe('datum', () => {
  test('defaults to MLLW datum', () => {
    const station = findStation('us-fl-ankona-indian-river')
    const extremes = station.getExtremesPrediction({
      start: new Date('2025-12-17T00:00:00Z'),
      end: new Date('2025-12-18T00:00:00Z')
    })
    expect(extremes.datum).toBe('MLLW')
  })

  test('accepts datum option', () => {
    const station = findStation('us-fl-ankona-indian-river')
    const extremes = station.getExtremesPrediction({
      start: new Date('2025-12-17T00:00:00Z'),
      end: new Date('2025-12-18T00:00:00Z'),
      datum: 'NAVD88'
    })
    expect(extremes.datum).toBe('NAVD88')
  })

  test('throws error for unavailable datum', () => {
    const station = findStation('us-ma-boston')
    expect(() => {
      station.getExtremesPrediction({
        start: new Date('2025-12-17T00:00:00Z'),
        end: new Date('2025-12-18T00:00:00Z'),
        datum: 'UNKNOWN_DATUM'
      })
    }).toThrow(/missing UNKNOWN_DATUM/)
  })

  test('throws error when missing MSL datum', () => {
    // Find station without MSL but with other datums
    const station = stations.find(
      (s) => !('MSL' in s.datums) && Object.keys(s.datums).length > 0
    )
    if (!station) expect.fail('No station without MSL datum found')
    expect(() => {
      useStation(station).getExtremesPrediction({
        start: new Date('2025-12-17T00:00:00Z'),
        end: new Date('2025-12-18T00:00:00Z'),
        datum: 'NAVD88'
      })
    }).toThrow(/missing MSL/)
  })

  test('does not apply datums when non available', () => {
    // Find a station with no datums
    const station = stations.find((s) => Object.entries(s.datums).length === 0)
    if (!station) expect.fail('No station without datums found')
    const extremes = useStation(station).getExtremesPrediction({
      start: new Date('2025-12-17T00:00:00Z'),
      end: new Date('2025-12-18T00:00:00Z')
    })

    expect(extremes.datum).toBeUndefined()
    expect(extremes.predictions.length).toBeGreaterThan(0)
  })
})
