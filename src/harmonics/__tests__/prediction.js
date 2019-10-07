import harmonics from '../index'
import mockHarmonicConstituents from '../__mocks__/constituents'
import moment from 'moment'
import prediction from '../prediction'

const startDate = moment({
  years: 2019,
  months: 8,
  date: 1,
  hours: 0,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
})
const endDate = moment({
  years: 2019,
  months: 8,
  date: 1,
  hours: 6,
  minutes: 0,
  seconds: 0,
  milliseconds: 0
})

const getPrediction = () => {
  const harmonic = new harmonics(mockHarmonicConstituents)
  harmonic.setTimeSpan(startDate, endDate)
  return harmonic.getPrediction()
}

describe('harmonic prediction', () => {
  test('it creates a prediction', () => {
    const testPrediction = getPrediction()
    expect(testPrediction).toBeInstanceOf(prediction)
  })

  test('it prepares prediction values', () => {
    const testPrediction = getPrediction()
    const { baseValue, baseSpeed, u, f } = testPrediction.prepare()
    expect(baseValue.M2).toBeCloseTo(5.65816609, 4)
    expect(baseSpeed.M2).toBeCloseTo(0.50586805, 4)
    expect(u[0].M2).toBeCloseTo(6.2471702, 4)
    // @to-do this might be wrong
    expect(f[0].M2).toBeCloseTo(1.0096589, 4)
  })

  test('it sets a correct phase type', () => {
    const testPrediction = getPrediction()
    expect(testPrediction.phaseType).toBe('GMT')
    testPrediction.setPhaseType('local')
    expect(testPrediction.phaseType).toBe('local')
    let errorMessage = false
    try {
      testPrediction.setPhaseType('wrong')
    } catch (error) {
      errorMessage = error
    }
    expect(errorMessage).toBe('phase type must be local or GMT')
  })

  test('it defines phases in constituents by radians', () => {
    const testPrediction = getPrediction()
    testPrediction.setConstituentPhases()
    let Q1 = false
    testPrediction.constituents.forEach(constituent => {
      if (constituent.name === 'Q1') {
        Q1 = constituent
      }
    })
    expect(Q1).not.toBeFalsy()
    expect(Q1._phase).toBeCloseTo(3.3999013828849542, 5)
  })

  test('it creates a timeline prediction', () => {
    const testPrediction = getPrediction()
    const results = testPrediction.getTimelinePrediction()
    expect(results[0].level).toBeCloseTo(-1.40468181, 3)
    expect(results[6].level).toBeCloseTo(2.60312343, 3)
  })
})
