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
      testStation = (0, _index["default"])(_station["default"]);
    } catch (e) {
      stationCreated = false;
    }

    expect(stationCreated).toBeTruthy();
    expect(testStation.isSubordinate).toBeFalsy();
    testStation = {};

    try {
      testStation = (0, _index["default"])(_station["default"]);
    } catch (e) {
      stationCreated = false;
    }

    expect(stationCreated).toBeTruthy();
    testStation.setIsSubordinate(true);
    expect(testStation.isSubordinate).toBeTruthy();
  });
  test('it predicts the tides in a timeline', function () {
    var results = (0, _index["default"])(_station["default"]).getTimelinePrediction(startDate, endDate);
    expect(results[0].level).toBeCloseTo(-1.34712509, 3);
    expect(results.pop().level).toBeCloseTo(2.85263589, 3);
  });
  test('it predicts the tidal extremes', function () {
    var results = (0, _index["default"])(_station["default"]).getExtremesPrediction(startDate, endDate);
    expect(results[0].level).toBeCloseTo(-1.565033, 4);
  });
  test('it fetches a single water level', function () {
    var result = (0, _index["default"])(_station["default"]).getWaterLevelAtTime(startDate);
    expect(result.level).toBeCloseTo(-1.34712509, 4);
  });
  test('it adds offset phases', function () {
    var results = (0, _index["default"])(_station["default"], {
      offset: 3
    }).getExtremesPrediction(startDate, endDate);
    expect(results[0].level).toBeCloseTo(1.43496678, 4);
  });
});
