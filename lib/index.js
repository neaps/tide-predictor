"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./harmonics/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var tidePredictionFactory = function tidePredictionFactory(constituents, options) {
  var harmonicsOptions = {
    harmonicConstituents: constituents,
    phaseKey: 'phase_GMT',
    offset: false
  };

  if (typeof options !== 'undefined') {
    Object.keys(harmonicsOptions).forEach(function (key) {
      if (typeof options[key] !== 'undefined') {
        harmonicsOptions[key] = options[key];
      }
    });
  }

  var tidePrediction = {
    getTimelinePrediction: function getTimelinePrediction(_ref) {
      var start = _ref.start,
          end = _ref.end;
      return (0, _index["default"])(harmonicsOptions).setTimeSpan(start, end).prediction().getTimelinePrediction();
    },
    getExtremesPrediction: function getExtremesPrediction(_ref2) {
      var start = _ref2.start,
          end = _ref2.end,
          labels = _ref2.labels,
          offsets = _ref2.offsets;
      return (0, _index["default"])(harmonicsOptions).setTimeSpan(start, end).prediction().getExtremesPrediction(labels, offsets);
    },
    getWaterLevelAtTime: function getWaterLevelAtTime(_ref3) {
      var time = _ref3.time;
      var endDate = new Date(time.getTime() + 10 * 60 * 1000);
      return (0, _index["default"])(harmonicsOptions).setTimeSpan(time, endDate).prediction().getTimelinePrediction()[0];
    }
  };
  return tidePrediction;
};

var _default = tidePredictionFactory;
exports["default"] = _default;
