"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prediction = _interopRequireDefault(require("./prediction"));

var _index = _interopRequireDefault(require("../constituent/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Harmonics =
/*#__PURE__*/
function () {
  /**
   * Sets up a new harmonics class.
   * @constructor
   */
  function Harmonics(constituents) {
    var _this = this;

    _classCallCheck(this, Harmonics);

    this.requiredFields = ['name', 'amplitude', 'phase_GMT', 'phase_local', 'speed'];

    if (!Array.isArray(constituents)) {
      throw new Error('Harmonic constituents are not an array');
    }

    this.constituents = [];
    constituents.forEach(function (constituent, index) {
      _this.requiredFields.forEach(function (field) {
        if (typeof constituent[field] === 'undefined') {
          throw new Error("Harmonic constituent entry missing field ".concat(field));
        }
      });

      if (typeof _index["default"][constituent.name] !== 'undefined') {
        constituent._model = _index["default"][constituent.name];

        _this.constituents.push(constituent);
      }
    });
  }

  _createClass(Harmonics, [{
    key: "setOffset",
    value: function setOffset(offset) {
      this.constituents.push({
        name: 'Z0',
        _model: _index["default"].Z0,
        _offsetPhase: 0,
        amplitude: offset
      });
    }
    /**
     * Sets the start & stop time to get data from.
     * @param {Date, unix timestamp} start
     * @param {Date, unix timestamp} end
     */

  }, {
    key: "setTimeSpan",
    value: function setTimeSpan(start, end) {
      this.start = this.getDate(start);
      this.end = this.getDate(end);

      if (this.start.getTime() >= this.end.getTime()) {
        throw new Error('Start time must be before end time');
      }
    }
  }, {
    key: "timelineIsSet",
    value: function timelineIsSet() {
      return !(typeof this.start === 'undefined' || typeof this.end === 'undefined');
    }
    /**
     * Helper function to check that a date is valid,
     * returns an instance of Date.
     * @param {Date, unix timestamp} time
     */

  }, {
    key: "getDate",
    value: function getDate(time) {
      if (time instanceof Date) {
        return time;
      }

      if (typeof time === 'number') {
        return new Date(time * 1000);
      }

      throw new Error('Invalid date format, should be a Date object, or timestamp');
    }
    /**
     * Returns unix timestamps between start and end
     * times, divided by number of seconds. Defaults to 10 minutes.
     * Also returns an array of raw hours between those times for
     * heruristic modeling.
     * @param {number} seconds
     */

  }, {
    key: "timeline",
    value: function timeline(seconds) {
      seconds = typeof seconds !== 'undefined' ? seconds : 10 * 60;
      var timeline = [];
      var end = this.end.getTime() / 1000;
      var lastTime = this.start.getTime() / 1000;
      var startTime = lastTime;
      var hours = [];

      while (lastTime <= end) {
        timeline.push(new Date(lastTime * 1000));
        hours.push((lastTime - startTime) / (60 * 60));
        lastTime += seconds;
      }

      return {
        items: timeline,
        hours: hours
      };
    }
    /**
     * Returns a prediction class
     */

  }, {
    key: "getPrediction",
    value: function getPrediction() {
      return new _prediction["default"]({
        timeline: this.timeline(),
        constituents: this.constituents,
        start: this.start
      });
    }
  }]);

  return Harmonics;
}();

var _default = Harmonics;
exports["default"] = _default;
