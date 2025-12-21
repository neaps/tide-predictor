import { describe, it, expect } from 'vitest'
import harmonics, { ExtremeOffsets } from '../../src/harmonics/index.js'
import mockHarmonicConstituents from '../_mocks/constituents.js'

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
    expect(results[0].level).toBeCloseTo(-1.347125, 3)
    expect(lastResult?.level).toBeCloseTo(2.85263589, 3)
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
    expect(results[0].level).toBeCloseTo(2.7560979, 3)
    const lastPhaseResult = results.pop()
    expect(lastPhaseResult?.level).toBeCloseTo(-2.9170977, 3)
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
    expect(results[0].level).toBeCloseTo(-1.5650332, 4)

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
    expect(labelResults[0].label).toBe(customLabels.low)
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
    expect(results[0].level).toBeCloseTo(-1.5653894, 4)
  })
})

describe('Secondary stations', () => {
  const regularResults = harmonics({
    harmonicConstituents: mockHarmonicConstituents,
    phaseKey: 'phase_GMT',
    offset: false
  })
    .setTimeSpan(startDate, extremesEndDate)
    .prediction()
    .getExtremesPrediction()

  it('it can add ratio offsets to secondary stations', () => {
    const offsets: ExtremeOffsets = {
      height: {
        type: 'ratio',
        high: 1.1,
        low: 1.2
      },
      time: {
        high: 1,
        low: 2
      }
    }

    const offsetResults = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction({ offsets })

    offsetResults.forEach((offsetResult, index) => {
      if (offsetResult.low) {
        expect(offsetResult.level).toBeCloseTo(
          regularResults[index].level * offsets.height!.low!,
          4
        )
        expect(offsetResult.time.getTime()).toBe(
          regularResults[index].time.getTime() + offsets.time!.low! * 60 * 1000
        )
      }
      if (offsetResult.high) {
        expect(offsetResult.level).toBeCloseTo(
          regularResults[index].level * offsets.height!.high!,
          4
        )

        expect(offsetResult.time.getTime()).toBe(
          regularResults[index].time.getTime() + offsets.time!.high! * 60 * 1000
        )
      }
    })
  })
  it('it can add fixed offsets to secondary stations', () => {
    const offsets: ExtremeOffsets = {
      height: {
        type: 'fixed',
        high: 1.1,
        low: 1.2
      },
      time: {
        high: 1,
        low: 2
      }
    }

    const offsetResults = harmonics({
      harmonicConstituents: mockHarmonicConstituents,
      phaseKey: 'phase_GMT',
      offset: false
    })
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction({ offsets })

    offsetResults.forEach((offsetResult, index) => {
      if (offsetResult.low) {
        expect(offsetResult.level).toBeCloseTo(
          regularResults[index].level + offsets.height!.low!,
          4
        )
        expect(offsetResult.time.getTime()).toBe(
          regularResults[index].time.getTime() + offsets.time!.low! * 60 * 1000
        )
      }
      if (offsetResult.high) {
        expect(offsetResult.level).toBeCloseTo(
          regularResults[index].level + offsets.height!.high!,
          4
        )

        expect(offsetResult.time.getTime()).toBe(
          regularResults[index].time.getTime() + offsets.time!.high! * 60 * 1000
        )
      }
    })
  })
})
