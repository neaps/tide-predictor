"use strict";

var _station = _interopRequireDefault(require("../__mocks__/station"));

var _index = _interopRequireDefault(require("../index.js"));

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
describe('Tidal station', function () {
  test('it is created correctly', function () {
    var stationCreated = true;
    var testStation = {};

    try {
      testStation = new _index["default"](_station["default"]);
    } catch (e) {
      stationCreated = false;
    }

    expect(stationCreated).toBeTruthy();
    expect(testStation.isSubordinate).toBeFalsy();
    testStation = {};
    _station["default"].isSubordinate = true;

    try {
      testStation = new _index["default"](_station["default"]);
    } catch (e) {
      stationCreated = false;
    }

    expect(stationCreated).toBeTruthy();
    expect(testStation.isSubordinate).toBeTruthy();
  });
  test('it sets timespan', function () {
    var timeErrorMessage = false;
    var testStation = new _index["default"](_station["default"]);

    try {
      testStation.setTimeSpan(startDate, endDate);
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage).toBeFalsy();
  });
  test('it throws error if times are not set', function () {
    var testStation = new _index["default"](_station["default"]);
    var timeError = false;

    try {
      testStation.getTimelinePrediction();
    } catch (error) {
      timeError = error;
    }

    expect(timeError.message).toBe('Start and end times not set');
    timeError = false;

    try {
      testStation.getExtremesPrediction();
    } catch (error) {
      timeError = error;
    }

    expect(timeError.message).toBe('Start and end times not set');
  });
  test('it predicts the tides in a timeline', function () {
    var testStation = new _index["default"](_station["default"]);
    testStation.setTimeSpan(startDate, endDate);
    var results = testStation.getTimelinePrediction();
    expect(results[0].level).toBeCloseTo(-1.34712509, 3);
    expect(results.pop().level).toBeCloseTo(2.85263589, 3);
  });
  test('it predicts the tidal extremes', function () {
    var testStation = new _index["default"](_station["default"]);
    testStation.setTimeSpan(startDate, endDate);
    var results = testStation.getExtremesPrediction();
    expect(results[0].level).toBeCloseTo(-1.565033, 4);
  });
  test('it fetches a single water level', function () {
    var testStation = new _index["default"](_station["default"]);
    var result = testStation.getWaterLevelAtTime(startDate);
    expect(result.level).toBeCloseTo(-1.34712509, 4);
  });
  test('it adds offset phases', function () {
    var testStation = new _index["default"](_station["default"]);
    testStation.setOffset(3);
    testStation.setTimeSpan(startDate, endDate);
    var results = testStation.getExtremesPrediction();
    expect(results[0].level).toBeCloseTo(1.43496678, 4);
  });
});
