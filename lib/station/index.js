"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../harmonics/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Station =
/*#__PURE__*/
function () {
  function Station(stationInfo) {
    _classCallCheck(this, Station);

    this.harmonics = [];
    this.isSubordinate = false;
    this.stationInfo = stationInfo;

    if (stationInfo) {
      this.setHarmonicConstituents(stationInfo.HarmonicConstituents);
      this.setIsSubordinate(typeof stationInfo.isSubordinate !== 'undefined' ? stationInfo.isSubordinate : false);
    }
  }

  _createClass(Station, [{
    key: "setIsSubordinate",
    value: function setIsSubordinate(isSubordinate) {
      this.isSubordinate = isSubordinate;
    }
  }, {
    key: "setHarmonicConstituents",
    value: function setHarmonicConstituents(constituents) {
      this.harmonics = new _index["default"](constituents);
    }
  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this.harmonics.setOffset(offset);
    }
    /**
     * Sets the start & stop time to get data from.
     * @param {Date, unix timestamp} start
     * @param {Date, unix timestamp} end
     */

  }, {
    key: "setTimeSpan",
    value: function setTimeSpan(start, end) {
      this.harmonics.setTimeSpan(start, end);
    }
  }, {
    key: "getTimelinePrediction",
    value: function getTimelinePrediction() {
      if (!this.harmonics.timelineIsSet()) {
        throw new Error('Start and end times not set');
      }

      var prediction = this.harmonics.getPrediction();
      return prediction.getTimelinePrediction();
    }
  }, {
    key: "getExtremesPrediction",
    value: function getExtremesPrediction() {
      if (!this.harmonics.timelineIsSet()) {
        throw new Error('Start and end times not set');
      }

      var prediction = this.harmonics.getPrediction();
      return prediction.getExtremesPrediction();
    }
  }, {
    key: "getWaterLevelAtTime",
    value: function getWaterLevelAtTime(time) {
      var harmonic = new _index["default"](this.stationInfo.HarmonicConstituents);
      var endDate = new Date(time.getTime() + 10 * 60 * 1000);
      harmonic.setTimeSpan(time, endDate);
      return harmonic.getPrediction().getTimelinePrediction()[0];
    }
  }]);

  return Station;
}();

var _default = Station;
exports["default"] = _default;
