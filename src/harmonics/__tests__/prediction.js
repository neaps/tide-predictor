import harmonics from '../index'
import mockHarmonicConstituents from '../__mocks__/constituents'
import { setConstituentPhases } from '../prediction'
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

const prediction = () => {
  const harmonic = harmonics(mockHarmonicConstituents)
  harmonic.setTimeSpan(startDate, endDate)
  return harmonic.prediction()
}

describe('harmonic prediction', () => {
  test('it creates constituent phase indexes in radians', () => {
    const testConstituents = [
      {
        phase_test: 1
      },
      {
        phase_test: 2
      }
    ]
    const results = setConstituentPhases(testConstituents, 'phase_test')
    expect(results[1]._phase).toBeCloseTo(0.034906585, 4)
  })

  test('it creates a timeline prediction', () => {
    const testPrediction = prediction()
    const results = testPrediction.getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.347125, 3)
    expect(results.pop().level).toBeCloseTo(2.85263589, 3)
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

    const harmonic = harmonics(mockHarmonicConstituents)
    harmonic.setTimeSpan(startDate, extremesEndDate)
    const testPrediction = harmonic.prediction()
    const results = testPrediction.getExtremesPrediction()
    expect(results[0].level).toBeCloseTo(-1.5650332, 4)
  })
})
