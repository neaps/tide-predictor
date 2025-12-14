import { describe, it, expect } from 'vitest'
import harmonics, { getDate, getTimeline } from '../../src/harmonics/index.js'
import mockHarmonicConstituents from '../_mocks/constituents.js'

const startDate = new Date(1567346400 * 1000) // 2019-09-01
const endDate = new Date(1569966078 * 1000) // 2019-10-01

describe('harmonics', () => {
  it('it checks constituents', () => {
    expect(() => harmonics({ harmonicConstituents: 'not array' })).toThrow(
      'Harmonic constituents are not an array'
    )

    expect(() => {
      harmonics({
        harmonicConstituents: [
          {
            description: 'Missing name property',
            amplitude: 0.43,
            phase_GMT: 180.1,
            phase_local: 309.4
          }
        ]
      })
    }).toThrow('Harmonic constituents must have a name property')

    expect(() => {
      harmonics({
        harmonicConstituents: [
          {
            name: 'not a name',
            description: 'Principal lunar semidiurnal constituent',
            amplitude: 1.61,
            phase_GMT: 181.3,
            phase_local: 309.4,
            speed: 28.984104
          },
          {
            name: 'M2',
            description: 'Principal solar semidiurnal constituent',
            amplitude: 0.43,
            phase_GMT: 180.1,
            phase_local: 309.4
          }
        ]
      })
    }).not.toThrow()
  })

  it('it checks start and end times', () => {
    const testHarmonics = harmonics({
      harmonicConstituents: mockHarmonicConstituents
    })
    expect(() => {
      testHarmonics.setTimeSpan('lkjsdlf', 'sdfklj')
    }).toThrow('Invalid date format, should be a Date object, or timestamp')

    expect(() => {
      testHarmonics.setTimeSpan(startDate, startDate)
    }).toThrow('Start time must be before end time')

    expect(() => {
      testHarmonics.setTimeSpan(startDate, endDate)
    }).not.toThrow()
  })

  it('it parses dates correctly', () => {
    const parsedDate = getDate(startDate)
    expect(parsedDate.getTime()).toBe(startDate.getTime())

    const parsedUnixDate = getDate(startDate.getTime() / 1000)
    expect(parsedUnixDate.getTime()).toBe(startDate.getTime())
  })

  it('it creates timeline correctly', () => {
    const seconds = 20 * 60
    const difference =
      Math.round(
        (endDate.getTime() / 1000 - startDate.getTime() / 1000) / seconds
      ) + 1
    const { items, hours } = getTimeline(startDate, endDate, seconds)
    expect(items.length).toBe(difference)
    expect(hours.length).toBe(difference)
  })
})
