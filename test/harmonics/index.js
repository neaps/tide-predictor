import assert from 'assert'
import harmonics, { getDate, getTimeline } from '../../src/harmonics/index.js'
import mockHarmonicConstituents from '../_mocks/constituents.js'

const startDate = new Date(1567346400 * 1000) // 2019-09-01
const endDate = new Date(1569966078 * 1000) // 2019-10-01

describe('harmonics', () => {
  it('it checks constituents', () => {
    let errorMessage = false

    try {
      harmonics({ harmonicConstituents: 'not array' })
    } catch (error) {
      errorMessage = error
    }
    assert.ok(errorMessage.message === 'Harmonic constituents are not an array')

    errorMessage = false

    try {
      harmonics({
        harmonicConstituents: [
          {
            name: 'M2',
            description: 'Principal lunar semidiurnal constituent',
            amplitude: 1.61,
            phase_GMT: 181.3,
            phase_local: 309.4,
            speed: 28.984104
          },
          {
            description: 'Principal solar semidiurnal constituent',
            amplitude: 0.43,
            phase_GMT: 180.1,
            phase_local: 309.4
          }
        ]
      })
    } catch (error) {
      errorMessage = error
    }
    assert.ok(
      errorMessage.message === 'Harmonic constituents must have a name property'
    )

    errorMessage = false

    try {
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
    } catch (error) {
      errorMessage = error
    }
    assert.ok(!errorMessage.message)
  })

  it('it checks start and end times', () => {
    const testHarmonics = harmonics({
      harmonicConstituents: mockHarmonicConstituents
    })
    let timeErrorMessage = false
    try {
      testHarmonics.setTimeSpan('lkjsdlf', 'sdfklj')
    } catch (error) {
      timeErrorMessage = error
    }
    assert.ok(
      timeErrorMessage.message ===
        'Invalid date format, should be a Date object, or timestamp'
    )

    timeErrorMessage = false
    try {
      testHarmonics.setTimeSpan(startDate, startDate)
    } catch (error) {
      timeErrorMessage = error
    }
    assert.ok(timeErrorMessage.message === 'Start time must be before end time')

    timeErrorMessage = false
    try {
      testHarmonics.setTimeSpan(startDate, endDate)
    } catch (error) {
      timeErrorMessage = error
    }
    assert.ok(!timeErrorMessage.message)
  })

  it('it parses dates correctly', () => {
    const parsedDate = getDate(startDate)
    assert.ok(parsedDate.getTime() === startDate.getTime())

    const parsedUnixDate = getDate(startDate.getTime() / 1000)
    assert.ok(parsedUnixDate.getTime() === startDate.getTime())
  })

  it('it creates timeline correctly', () => {
    const seconds = 20 * 60
    const difference =
      Math.round(
        (endDate.getTime() / 1000 - startDate.getTime() / 1000) / seconds
      ) + 1
    const { items, hours } = getTimeline(startDate, endDate, seconds)
    assert.ok(items.length === difference)
    assert.ok(hours.length === difference)
  })
})
