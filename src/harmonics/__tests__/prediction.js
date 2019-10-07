import harmonics from '../index'
import mockHarmonicConstituents from '../__mocks__/constituents'
import moment from 'moment'
import prediction from '../prediction'

const startDate = moment('2019-09-01')
const endDate = moment('2019-10-01')

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
    //expect(baseValue.M2).toBeCloseTo(5.65816609, 4)
    //expect(baseSpeed.M2).toBeCloseTo(0.50586805, 4)
    //expect(u[0].M2).toBeCloseTo(6.2471702, 4)
    //expect(f[0].M2).toBeCloseTo(1.00949147, 4)
  })
})
