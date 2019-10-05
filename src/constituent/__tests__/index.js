import constituent, { extendedDoodson, sortedDoodson } from '../index'

describe('constituent', () => {
  test('it sorts Doodson numbers', () => {
    expect(extendedDoodson.K).toBe(11)
    expect(sortedDoodson[11]).toBe('K')
  })

  test('it converts Doodson numbers to cooeficient', () => {
    const testCooefficient = new constituent(null, [])
    const coefficient = testCooefficient.doodsonNumberToCooeficient('A BZY ZZY')
    expect(coefficient).toEqual(expect.arrayContaining([1, 2, 0, -1, 0, 0, -1]))
  })

  test('it converts cooeficient to Doodson number', () => {
    const testCooefficient = new constituent(null, [])
    const doodsonNumber = testCooefficient.cooeficientToDoodsonNumber([
      1,
      2,
      0,
      -1,
      0,
      0,
      -1
    ])
    expect(doodsonNumber).toEqual('ABZYZZY')
  })

  test('it creates cooeficient hashes', () => {
    const testCooefficient = new constituent(null, [1, 2, 0, -1, 0, 0, -1])
    const hash = testCooefficient.hash()
    expect(hash).toEqual('120m100m1')
  })
})
