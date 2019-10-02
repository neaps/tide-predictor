import harmonics from '../index'
import mockHarmonicConstituents from '../__mocks__/constituents'
import moment from 'moment'
import prediction from '../prediction'

const getPrediction = () => {
  const startDate = moment.unix(1567346400) //2019-09-01
  const endDate = moment.unix(1569966078) //2019-10-01
  const harmonic = new harmonics(mockHarmonicConstituents)
  harmonic.setTimeSpan(startDate, endDate)
  return harmonic.getPrediction()
}

test('prediction class is valid', () => {
  const testPrediction = getPrediction()
  expect(testPrediction).toBeInstanceOf(prediction)
})
