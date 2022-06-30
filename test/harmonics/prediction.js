import assert from 'assert'
import closeTo from '../lib/close-to.js'
import harmonics from '../../src/harmonics/index.js'
import mockHarmonicConstituents from '../_mocks/constituents.js'
import mockSecondaryStation from '../_mocks/secondary-station.js'

const startDate = new Date()
startDate.setFullYear(2019)
startDate.setMonth(8)
startDate.setDate(1)
startDate.setHours(0)
startDate.setMinutes(0)
startDate.setSeconds(0)
startDate.setMilliseconds(0)

const endDate = new Date()
endDate.setFullYear(2019)
endDate.setMonth(8)
endDate.setDate(1)
endDate.setHours(6)
endDate.setMinutes(0)
endDate.setSeconds(0)
endDate.setMilliseconds(0)

const extremesEndDate = new Date()
extremesEndDate.setFullYear(2019)
extremesEndDate.setMonth(8)
extremesEndDate.setDate(3)
extremesEndDate.setHours(0)
extremesEndDate.setMinutes(0)
extremesEndDate.setSeconds(0)
extremesEndDate.setMilliseconds(0)

const setUpPrediction = () => {
  const harmonic = harmonics({
    harmonicConstituents: mockHarmonicConstituents,
    phaseKey: 'phase_GMT',
    offset: false
  })
  harmonic.setTimeSpan(startDate, endDate)
  return harmonic.prediction()
}

describe('harmonic prediction', () => {
  it('it creates a timeline prediction', () => {
    const testPrediction = setUpPrediction()
    const results = testPrediction.getTimelinePrediction()
    const lastResult = results.pop()
    closeTo(results[0].level, -1.347125, 3)
    closeTo(lastResult.level, 2.85263589, 3)
  })

  it('it creates a timeline prediction with a non-default phase key', () => {
    const results = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_local',
      offset: false
    })
      .setTimeSpan(startDate, endDate)
      .prediction()
      .getTimelinePrediction()
    closeTo(results[0].level, 2.7560979, 3)
    closeTo(results.pop().level, -2.9170977, 3)
  })

  it('it finds high and low tides', () => {
    const results = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction()
    closeTo(results[0].level, -1.5650332, 4)

    const customLabels = {
      high: 'Super high',
      low: 'Wayyy low'
    }

    const labelResults = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction({ labels: customLabels })
    assert.ok(labelResults[0].label === customLabels.low)
  })

  it('it finds high and low tides with high fidelity', () => {
    const results = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction({ timeFidelity: 60 })
      .getExtremesPrediction()
    closeTo(results[0].level, -1.5653894, 4)
  })
})

describe('Secondary stations', () => {
  it('it can add offsets to secondary stations', () => {
    const regularResults = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction()

    const offsetResults = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction({ offsets: mockSecondaryStation })

    offsetResults.forEach((offsetResult, index) => {
      if (offsetResult.low) {
        closeTo(
          offsetResult.level,
          regularResults[index].level * mockSecondaryStation.height_offset.low,
          4
        )
        assert.ok(
          offsetResult.time.getTime() ===
            regularResults[index].time.getTime() +
              mockSecondaryStation.time_offset.low * 60 * 1000
        )
      }
      if (offsetResult.high) {
        closeTo(
          offsetResult.level,
          regularResults[index].level * mockSecondaryStation.height_offset.high,
          4
        )

        assert.ok(
          offsetResult.time.getTime() ===
            regularResults[index].time.getTime() +
              mockSecondaryStation.time_offset.high * 60 * 1000
        )
      }
    })
  })
})
