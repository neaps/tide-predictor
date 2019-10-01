import harmonics, { harmonicTypes } from '../index'

test('harmonicTypes has types defined', () => {
  expect(harmonicTypes.M2).toBeDefined()
  expect(harmonicTypes.M3).toBe('Lunar terdiurnal constituent')
})
