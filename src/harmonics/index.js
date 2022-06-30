import prediction from './prediction'
import constituentModels from '../constituents/index'
import { d2r } from '../astronomy/constants'

const getDate = (time) => {
  if (time instanceof Date) {
    return time
  }
  if (typeof time === 'number') {
    return new Date(time * 1000)
  }
  throw new Error('Invalid date format, should be a Date object, or timestamp')
}

const getTimeline = (start, end, seconds) => {
  seconds = typeof seconds !== 'undefined' ? seconds : 10 * 60
  const items = []
  const endTime = end.getTime() / 1000
  let lastTime = start.getTime() / 1000
  const startTime = lastTime
  const hours = []
  while (lastTime <= endTime) {
    items.push(new Date(lastTime * 1000))
    hours.push((lastTime - startTime) / (60 * 60))
    lastTime += seconds
  }

  return {
    items,
    hours
  }
}

const harmonicsFactory = ({ harmonicConstituents, phaseKey, offset }) => {
  if (!Array.isArray(harmonicConstituents)) {
    throw new Error('Harmonic constituents are not an array')
  }
  const constituents = []
  harmonicConstituents.forEach((constituent, index) => {
    if (typeof constituent.name === 'undefined') {
      throw new Error('Harmonic constituents must have a name property')
    }
    if (typeof constituentModels[constituent.name] !== 'undefined') {
      constituent._model = constituentModels[constituent.name]
      constituent._phase = d2r * constituent[phaseKey]
      constituents.push(constituent)
    }
  })

  if (offset !== false) {
    constituents.push({
      name: 'Z0',
      _model: constituentModels.Z0,
      _phase: 0,
      amplitude: offset
    })
  }

  let start = new Date()
  let end = new Date()

  const harmonics = {}

  harmonics.setTimeSpan = (startTime, endTime) => {
    start = getDate(startTime)
    end = getDate(endTime)
    if (start.getTime() >= end.getTime()) {
      throw new Error('Start time must be before end time')
    }
    return harmonics
  }

  harmonics.prediction = (options) => {
    options =
      typeof options !== 'undefined' ? options : { timeFidelity: 10 * 60 }
    return prediction({
      timeline: getTimeline(start, end, options.timeFidelity),
      constituents,
      start
    })
  }

  return Object.freeze(harmonics)
}

export default harmonicsFactory
export { getDate, getTimeline }
