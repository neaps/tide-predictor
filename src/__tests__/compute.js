import compute from '../compute2'
import testConstituents from '../__mocks__/constituents'
import mockWaterLevels from '../__mocks__/water-levels-short'

const waterLevels = mockWaterLevels.map(waterLevel => {
  waterLevel.time = new Date(waterLevel.time)
  waterLevel.level = parseFloat(waterLevel.level)
  return waterLevel
})

let testConstituent = {}
testConstituents.forEach(constituent => {
  if (constituent.name === 'M1') {
    testConstituent = constituent
  }
})

test('compute', () => {
  const model = compute(waterLevels)
  //expect(model.M1.phase).toBeCloseTo(testConstituent.phase_GMT, 4)
  //expect(model.M1.amplitude).toBeCloseTo(testConstituent.amplitude, 4)
})
/*
describe('Harmonic constituents are correctly computed', () => {
  test('computed values match expected pattern', () => {
    let errorMessage = false
    try {
      const tideCompute = compute('not an array') // eslint-disable-line
    } catch (error) {
      errorMessage = error.message
    }
    expectExport(errorMessage).toBe('Tide observations must be an array')

    try {
      const tideCompute = compute([{ a: 'b' }]) // eslint-disable-line
    } catch (error) {
      errorMessage = error.message
    }
    expectExport(errorMessage).toBe(
      'Tide observations be an array of objects with the properties "time" and "level"'
    )
  })

  test('it prepares water levels', () => {
    const { firstTime, levels, heights } = prepareWaterLevel(waterLevels)
    expect(firstTime.getTime()).toBe(waterLevels[0].time.getTime())
    expect(levels[10].hour).toBe(10)
    expect(heights[0]).toBeCloseTo(-1.19620916, 4)
  })

  test('it prepares the correct number of constituents', () => {
    const constituents = getComputeConstituents(new Date('2018-01-01'), 6000, 2)
    expect(Object.keys(constituents).length).toBe(35)

    const shortConstituents = getComputeConstituents(
      new Date('2018-01-01'),
      10,
      2
    )
    expect(Object.keys(shortConstituents).length).toBe(3)
  })

  test('it computes an initial model based on means', () => {
    return
    const testHeights = [1, 2, 3, 4, 5]
    const numberConstiuents = 10
    const initialModel = computeInitialModel(testHeights, numberConstiuents)
    expect(initialModel.amplitudes.length).toBe(numberConstiuents)
    expect(initialModel.phases[1]).toBe(1)
    expect(initialModel.amplitudes[0]).toBeCloseTo(1.483239697, 4)
  })

  test('computes tidal harmonics', () => {
    let testLevels = [
      {
        time: '2018-01-01 00:00',
        level: -1.15
      },
      {
        time: '2018-01-01 01:00',
        level: -0.977
      },
      {
        time: '2018-01-01 02:00',
        level: -0.648
      },
      {
        time: '2018-01-01 03:00',
        level: -0.288
      },
      {
        time: '2018-01-01 04:00',
        level: 0.052
      },
      {
        time: '2018-01-01 05:00',
        level: 0.306
      },
      {
        time: '2018-01-01 06:00',
        level: 0.395
      }
    ]
    testLevels = testLevels.map(waterLevel => {
      waterLevel.time = new Date(waterLevel.time)
      waterLevel.level = parseFloat(waterLevel.level)
      return waterLevel
    })
    const tideCompute = compute(mockWaterLevels, { requiredPeriod: 0 })
  })
})
*/
