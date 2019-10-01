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
   * @param {moment, Date, string, unix timestamp} start
   * @param {moment, Date, string, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.start = this.getMomentFromDate(start)
    this.end = this.getMomentFromDate(end)
  }

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
}

export default harmonics
