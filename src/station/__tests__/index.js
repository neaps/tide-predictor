import mockStation from '../__mocks__/station'
import station from '../index'

test('station setup and test valid harmonics', () => {
  let stationCreated = true
  try {
    const testStation = new station(mockStation)
  } catch {
    stationCreated = false
  }
  expect(stationCreated).toBeTruthy()
  expect(stationCreated.isSubordinate).toBeFalsy()
})
