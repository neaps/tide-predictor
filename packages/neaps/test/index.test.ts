import {
  getExtremesPrediction,
  nearestStation,
  findStation
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
  ;[
    { lat: 26.7, lon: -80.05 },
    { lat: 26.7, lng: -80.05 },
    { latitude: 26.7, longitude: -80.05 }
  ].forEach((position) => {
    test(`accepts position with ${Object.keys(position).join('/')}`, () => {
      const extremes = getExtremesPrediction({
        ...position,
        start: new Date('2025-12-17T00:00:00Z'),
        end: new Date('2025-12-18T05:00:00Z')
      })
      expect(extremes.station.id).toEqual('us-fl-port-of-west-palm-beach')
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
