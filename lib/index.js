"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./harmonics/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tidePredictionFactory = function tidePredictionFactory(constituents, offset) {
  var tidePrediction = {
    isSubordinate: false,
    getTimelinePrediction: function getTimelinePrediction(start, end) {
      return (0, _index["default"])(constituents, offset).setTimeSpan(start, end).prediction().getTimelinePrediction();
    },
    getExtremesPrediction: function getExtremesPrediction(start, end) {
      return (0, _index["default"])(constituents, offset).setTimeSpan(start, end).prediction().getExtremesPrediction();
    },
    getWaterLevelAtTime: function getWaterLevelAtTime(time) {
      var endDate = new Date(time.getTime() + 10 * 60 * 1000);
      return (0, _index["default"])(constituents).setTimeSpan(time, endDate).prediction().getTimelinePrediction()[0];
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
