"use strict";

var _index = _interopRequireDefault(require("../index"));

var _constituents = _interopRequireDefault(require("../__mocks__/constituents"));

var _prediction = require("../prediction");

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

var prediction = function prediction() {
  var harmonic = (0, _index["default"])(_constituents["default"]);
  harmonic.setTimeSpan(startDate, endDate);
  return harmonic.prediction();
};

describe('harmonic prediction', function () {
  test('it creates constituent phase indexes in radians', function () {
    var testConstituents = [{
      phase_test: 1
    }, {
      phase_test: 2
    }];
    var results = (0, _prediction.setConstituentPhases)(testConstituents, 'phase_test');
    expect(results[1]._phase).toBeCloseTo(0.034906585, 4);
  });
  test('it creates a timeline prediction', function () {
    var testPrediction = prediction();
    var results = testPrediction.getTimelinePrediction();
    expect(results[0].level).toBeCloseTo(-1.347125, 3);
    expect(results.pop().level).toBeCloseTo(2.85263589, 3);
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
    var harmonic = (0, _index["default"])(_constituents["default"]);
    harmonic.setTimeSpan(startDate, extremesEndDate);
    var testPrediction = harmonic.prediction();
    var results = testPrediction.getExtremesPrediction();
    expect(results[0].level).toBeCloseTo(-1.5650332, 4);
  });
});
