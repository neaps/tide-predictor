import harmonics from '../index'
import mockHarmonicConstituents from '../__mocks__/constituents'

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

const setUpPrediction = () => {
  const harmonic = harmonics(mockHarmonicConstituents, 'phase_GMT', false)
  harmonic.setTimeSpan(startDate, endDate)
  return harmonic.prediction()
}

describe('harmonic prediction', () => {
  test('it creates a timeline prediction', () => {
    const testPrediction = setUpPrediction()
    const results = testPrediction.getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.347125, 3)
    expect(results.pop().level).toBeCloseTo(2.85263589, 3)
  })

  test('it creates a timeline prediction', () => {
    const results = harmonics(mockHarmonicConstituents, 'phase_GMT', false)
      .setTimeSpan(startDate, endDate)
      .prediction()
      .getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.347125, 3)
    expect(results.pop().level).toBeCloseTo(2.85263589, 3)
  })

  test('it creates a timeline prediction with a non-default phase key', () => {
    const results = harmonics(mockHarmonicConstituents, 'phase_local', false)
      .setTimeSpan(startDate, endDate)
      .prediction()
      .getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(2.7560979, 3)
    expect(results.pop().level).toBeCloseTo(-2.9170977, 3)
  })

  test('it finds high and low tides', () => {
    const extremesEndDate = new Date()
    endDate.setFullYear(2019)
    endDate.setMonth(8)
    endDate.setDate(3)
    endDate.setHours(0)
    endDate.setMinutes(0)
    endDate.setSeconds(0)
    endDate.setMilliseconds(0)

    const results = harmonics(mockHarmonicConstituents, 'phase_GMT', false)
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction()
    expect(results[0].level).toBeCloseTo(-1.5650332, 4)

    const customLabels = {
      high: 'Super high',
      low: 'Wayyy low'
    }

    const labelResults = harmonics(mockHarmonicConstituents, 'phase_GMT', false)
      .setTimeSpan(startDate, extremesEndDate)
      .prediction()
      .getExtremesPrediction(customLabels)
    expect(labelResults[0].label).toBe(customLabels.low)
  })
})
