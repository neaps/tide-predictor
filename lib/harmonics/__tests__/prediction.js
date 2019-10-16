"use strict";

var _index = _interopRequireDefault(require("../index"));

var _constituents = _interopRequireDefault(require("../__mocks__/constituents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var startDate = new Date();
startDate.setFullYear(2019);
startDate.setMonth(8);
startDate.setDate(1);
startDate.setHours(0);
startDate.setMinutes(0);
startDate.setSeconds(0);
startDate.setMilliseconds(0);
var endDate = new Date();
endDate.setFullYear(2019);
endDate.setMonth(8);
endDate.setDate(1);
endDate.setHours(6);
endDate.setMinutes(0);
endDate.setSeconds(0);
endDate.setMilliseconds(0);

var setUpPrediction = function setUpPrediction() {
  var harmonic = (0, _index["default"])(_constituents["default"], 'phase_GMT', false);
  harmonic.setTimeSpan(startDate, endDate);
  return harmonic.prediction();
};

describe('harmonic prediction', function () {
  test('it creates a timeline prediction', function () {
    var testPrediction = setUpPrediction();
    var results = testPrediction.getTimelinePrediction();
    expect(results[0].level).toBeCloseTo(-1.347125, 3);
    expect(results.pop().level).toBeCloseTo(2.85263589, 3);
  });
  test('it creates a timeline prediction', function () {
    var results = (0, _index["default"])(_constituents["default"], 'phase_GMT', false).setTimeSpan(startDate, endDate).prediction().getTimelinePrediction();
    expect(results[0].level).toBeCloseTo(-1.347125, 3);
    expect(results.pop().level).toBeCloseTo(2.85263589, 3);
  });
  test('it creates a timeline prediction with a non-default phase key', function () {
    var results = (0, _index["default"])(_constituents["default"], 'phase_local', false).setTimeSpan(startDate, endDate).prediction().getTimelinePrediction();
    expect(results[0].level).toBeCloseTo(2.7560979, 3);
    expect(results.pop().level).toBeCloseTo(-2.9170977, 3);
  });
  test('it finds high and low tides', function () {
    var extremesEndDate = new Date();
    endDate.setFullYear(2019);
    endDate.setMonth(8);
    endDate.setDate(3);
    endDate.setHours(0);
    endDate.setMinutes(0);
    endDate.setSeconds(0);
    endDate.setMilliseconds(0);
    var results = (0, _index["default"])(_constituents["default"], 'phase_GMT', false).setTimeSpan(startDate, extremesEndDate).prediction().getExtremesPrediction();
    expect(results[0].level).toBeCloseTo(-1.5650332, 4);
  });
});
