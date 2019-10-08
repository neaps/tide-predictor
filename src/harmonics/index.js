import prediction from './prediction'
import constituentModels from '../constituent'
import { isNumber } from 'util'

class harmonics {
  /**
   * Sets up a new harmonics class.
   * @constructor
   */
  constructor(constituents) {
    this.requiredFields = [
      'name',
      'amplitude',
      'phase_GMT',
      'phase_local',
      'speed'
    ]

    if (!Array.isArray(constituents)) {
      throw 'Harmonic constituents are not an array'
    }
    this.constituents = []
    constituents.forEach((constituent, index) => {
      this.requiredFields.forEach(field => {
        if (typeof constituent[field] === 'undefined') {
          throw `Harmonic constituent entry missing field ${field}`
        }
      })
      if (typeof constituentModels[constituent.name] !== 'undefined') {
        constituent._model = constituentModels[constituent.name]
        this.constituents.push(constituent)
      }
    })
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {Date, unix timestamp} start
   * @param {Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.start = this.getDate(start)
    this.end = this.getDate(end)
    if (this.start.getTime() >= this.end.getTime()) {
      throw 'Start time must be before end time'
    }
  }

  timelineIsSet() {
    return !(
      typeof this.start === 'undefined' || typeof this.end === 'undefined'
    )
  }

  /**
   * Helper function to check that a date is valid,
   * returns an instance of Date.
   * @param {Date, unix timestamp} time
   */
  getDate(time) {
    if (time instanceof Date) {
      return time
    }
    if (isNumber(time)) {
      return new Date(time * 1000)
    }
    throw 'Invalid date format, should be a Date object, or timestamp'
  }

  /**
   * Returns unix timestamps between start and end
   * times, divided by number of seconds. Defaults to 10 minutes.
   * Also returns an array of raw hours between those times for
   * heruristic modeling.
   * @param {number} seconds
   */
  timeline(seconds) {
    seconds = typeof seconds !== 'undefined' ? seconds : 10 * 60
    const timeline = []
    const end = this.end.getTime() / 1000
    let lastTime = this.start.getTime() / 1000
    const startTime = lastTime
    const hours = []
    while (lastTime <= end) {
      timeline.push(new Date(lastTime * 1000))
      hours.push((lastTime - startTime) / (60 * 60))
      lastTime += seconds
    }

    return {
      items: timeline,
      hours: hours
    }
  }

  /**
   * Returns a prediction class
   */
  getPrediction() {
    return new prediction({
      timeline: this.timeline(),
      constituents: this.constituents,
      start: this.start
    })
  }
}

export default harmonics
