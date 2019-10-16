"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./harmonics/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tidePredictionFactory = function tidePredictionFactory(constituents, options) {
  var phaseKey = 'phase_GMT';
  var offset = false;

  if (typeof options !== 'undefined') {
    phaseKey = typeof options.phaseKey !== 'undefined' ? options.phaseKey : 'phase_GMT';
    offset = typeof options.offset !== 'undefined' ? options.offset : false;
  }

  var tidePrediction = {
    isSubordinate: false,
    getTimelinePrediction: function getTimelinePrediction(start, end) {
      return (0, _index["default"])(constituents, phaseKey, offset).setTimeSpan(start, end).prediction().getTimelinePrediction();
    },
    getExtremesPrediction: function getExtremesPrediction(start, end) {
      return (0, _index["default"])(constituents, phaseKey, offset).setTimeSpan(start, end).prediction().getExtremesPrediction();
    },
    getWaterLevelAtTime: function getWaterLevelAtTime(time) {
      var endDate = new Date(time.getTime() + 10 * 60 * 1000);
      return (0, _index["default"])(constituents, phaseKey, offset).setTimeSpan(time, endDate).prediction().getTimelinePrediction()[0];
    }
  };

  tidePrediction.setIsSubordinate = function (newStatus) {
    tidePrediction.isSubordinate = newStatus;
    return tidePrediction;
  };

  return tidePrediction;
};

var _default = tidePredictionFactory;
exports["default"] = _default;
