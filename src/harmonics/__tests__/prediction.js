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
})
