import {
  getExtremesPrediction,
  nearestStation,
  findStation
} from '../src/index.js'
import { describe, test, expect } from 'vitest'

describe('getExtremesPrediction', () => {
  test('gets extremes from nearest station', () => {
    const { predictions } = getExtremesPrediction({
      lat: 26.7,
      lon: -80.05,
      start: new Date('2025-12-17T05:00:00Z'),
      end: new Date('2025-12-18T05:00:00Z'),
      timeFidelity: 6,
      datum: 'MLLW'
    })

    expect(predictions.length).toBe(4)
    expect(predictions[0].time).toEqual(new Date('2025-12-17T09:47:36.000Z')) // 04:47 EST
    expect(predictions[0].level).toBeCloseTo(0.03, 1) // NOAA prediction is 0.03, neaps is 0.05
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
      const { predictions } = getExtremesPrediction({
        ...position,
        start: new Date('2025-12-17T05:00:00Z'),
        end: new Date('2025-12-18T05:00:00Z')
      })
      expect(predictions.length).toBe(4)
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

    const start = new Date('2025-12-17T05:00:00Z')
    const end = new Date('2025-12-18T05:00:00Z')

    const { predictions } = station.getExtremesPrediction({
      start,
      end,
      timeFidelity: 6,
      datum: 'MLLW'
    })

    expect(predictions.length).toBe(4)
    expect(predictions[0].time).toEqual(new Date('2025-12-17T09:47:36.000Z')) // 04:47 EST
    expect(predictions[0].level).toBeCloseTo(0.03, 1) // NOAA prediction is 0.03, neaps is 0.05
    expect(predictions[0].high).toBe(false)
    expect(predictions[0].low).toBe(true)
    expect(predictions[0].label).toBe('Low')
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
