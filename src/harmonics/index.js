import moment from 'moment'
import prediction from './prediction'
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

    constituents.forEach(constituent => {
      this.requiredFields.forEach(field => {
        if (typeof constituent[field] === 'undefined') {
          throw `Harmonic constituent entry missing field ${field}`
        }
      })
    })

    this.constituents = constituents
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {moment, Date, unix timestamp} start
   * @param {moment, Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.start = this.getMomentFromDate(start)
    this.end = this.getMomentFromDate(end)
    if (this.start.isSameOrAfter(this.end)) {
      throw 'Start time must be before end time'
    }
  }

  /**
   * Helper function to check that a date is valid,
   * returns an instance of Moment.
   * @param {moment, Date, unix timestamp} time
   */
  getMomentFromDate(time) {
    if (moment.isMoment(time)) {
      return time
    }
    if (time instanceof Date) {
      return moment(time)
    }
    if (isNumber(time)) {
      return moment(time)
    }
    throw 'Invalid date format, should be a moment object, Date object, or timestamp'
  }

  /**
   * Returns the timestamp of the start year
   */
  getStartYear() {
    if (!this.start || !moment.isMoment(this.start)) {
      throw 'Start date is not yet set'
    }
    return moment(`${this.start.year()}-01-01`, 'YYYY-MM-DD').unix()
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
    const end = this.end.unix()
    let lastTime = this.start.unix()
    const hours = []
    const numberHours = (end - lastTime) / 60
    for (let i = 0; i < numberHours; i++) {
      hours.push(i)
    }
    while (lastTime <= end) {
      timeline.push(lastTime)
      lastTime += seconds
    }
    if (lastTime < end) {
      timeline.push(end)
    }

    return {
      unixTimestamps: timeline,
      hours: hours
    }
  }

  /**
   * Returns a prediction class
   */
  getPrediction() {
    return new prediction({
      timeline: this.timeline(),
      constituents: this.constituents
    })
  }
}

export default harmonics
