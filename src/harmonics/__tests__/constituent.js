import constituent, { extendedDoodson, sortedDoodson } from '../constituent'

test('Doodson numbers were sorted correctly', () => {
  expect(extendedDoodson.K).toBe(11)
  expect(sortedDoodson[11]).toBe('K')
})

test('Doodson number converts to cooeficient', () => {
  const testCooefficient = new constituent(null, [])
  const coefficient = testCooefficient.doodsonNumberToCooeficient('A BZY ZZY')
  expect(coefficient).toEqual(expect.arrayContaining([1, 2, 0, -1, 0, 0, -1]))
})
