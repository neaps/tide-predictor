import moment from 'moment'
import constituentTypes from './constituent-types'
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
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {moment, Date, unix timestamp} start
   * @param {moment, Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.start = this.getMomentFromDate(start)
    this.end = this.getMomentFromDate(end)
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
}

export default harmonics
