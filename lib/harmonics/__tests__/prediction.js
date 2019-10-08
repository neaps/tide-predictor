"use strict";

var _index = _interopRequireDefault(require("../index"));

var _constituents = _interopRequireDefault(require("../__mocks__/constituents"));

var _prediction = _interopRequireDefault(require("../prediction"));

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

var getPrediction = function getPrediction() {
  var harmonic = new _index["default"](_constituents["default"]);
  harmonic.setTimeSpan(startDate, endDate);
  return harmonic.getPrediction();
};

describe('harmonic prediction', function () {
  test('it creates a prediction', function () {
    var testPrediction = getPrediction();
    expect(testPrediction).toBeInstanceOf(_prediction["default"]);
  });
  test('it prepares prediction values', function () {
    var testPrediction = getPrediction();

    var _testPrediction$prepa = testPrediction.prepare(),
        baseValue = _testPrediction$prepa.baseValue,
        baseSpeed = _testPrediction$prepa.baseSpeed,
        u = _testPrediction$prepa.u,
        f = _testPrediction$prepa.f;

    expect(baseValue.M2).toBeCloseTo(5.65816609, 4);
    expect(baseSpeed.M2).toBeCloseTo(0.50586805, 4);
    expect(u[0].M2).toBeCloseTo(6.2471702, 4); // @to-do this might be wrong

    expect(f[0].M2).toBeCloseTo(1.0096589, 4);
  });
  test('it prepares prediction values by degrees', function () {
    var testPrediction = getPrediction();

    var _testPrediction$prepa2 = testPrediction.prepare(false),
        baseValue = _testPrediction$prepa2.baseValue,
        baseSpeed = _testPrediction$prepa2.baseSpeed,
        u = _testPrediction$prepa2.u,
        f = _testPrediction$prepa2.f;

    expect(baseValue.M2).toBeCloseTo(324.189036, 4);
    expect(baseSpeed.M2).toBeCloseTo(28.9841042, 4);
    expect(u[0].M2).toBeCloseTo(357.939049, 4);
    expect(f[0].M2).toBeCloseTo(1.0096589, 4);
  });
  test('it sets a correct phase type', function () {
    var testPrediction = getPrediction();
    expect(testPrediction.phaseType).toBe('GMT');
    testPrediction.setPhaseType('local');
    expect(testPrediction.phaseType).toBe('local');
    var errorMessage = false;

    try {
      testPrediction.setPhaseType('wrong');
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).toBe('phase type must be local or GMT');
  });
  test('it defines phases in constituents by radians', function () {
    var testPrediction = getPrediction();
    testPrediction.setConstituentPhases();
    var Q1 = false;
    testPrediction.constituents.forEach(function (constituent) {
      if (constituent.name === 'Q1') {
        Q1 = constituent;
      }
    });
    expect(Q1).not.toBeFalsy();
    expect(Q1._phase).toBeCloseTo(3.3999013828849542, 5);
  });
  test('it creates a timeline prediction', function () {
    var testPrediction = getPrediction();
    var results = testPrediction.getTimelinePrediction();
    expect(results[0].level).toBeCloseTo(-1.40468181, 3);
    expect(results.pop().level).toBeCloseTo(2.60312343, 3);
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
    var harmonic = new _index["default"](_constituents["default"]);
    harmonic.setTimeSpan(startDate, extremesEndDate);
    var testPrediction = harmonic.getPrediction();
    var results = testPrediction.getExtremesPrediction();
    expect(results[0].level).toBeCloseTo(-1.6146877, 4);
  });
});
