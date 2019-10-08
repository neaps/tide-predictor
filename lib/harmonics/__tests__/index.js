"use strict";

var _index = _interopRequireDefault(require("../index"));

var _constituentTypes = _interopRequireDefault(require("../constituent-types"));

var _constituents = _interopRequireDefault(require("../__mocks__/constituents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var startDate = new Date(1567346400 * 1000); //2019-09-01

var endDate = new Date(1569966078 * 1000); //2019-10-01

test('constituentTypes has types defined', function () {
  expect(_constituentTypes["default"].M2).toBeDefined();
  expect(_constituentTypes["default"].M3).toBe('Lunar terdiurnal constituent');
});
describe('harmonics', function () {
  test('it checks constituents', function () {
    var errorMessage = false;

    try {
      var testHarmonics = new _index["default"]('not array');
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).toBe('Harmonic constituents are not an array');
    errorMessage = false;

    try {
      var _testHarmonics = new _index["default"]([{
        name: 'M2',
        description: 'Principal lunar semidiurnal constituent',
        amplitude: 1.61,
        phase_GMT: 181.3,
        phase_local: 309.4,
        speed: 28.984104
      }, {
        name: 'S2',
        description: 'Principal solar semidiurnal constituent',
        amplitude: 0.43,
        phase_GMT: 180.1,
        phase_local: 309.4
      }]);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).toBe('Harmonic constituent entry missing field speed');
  });
  test('it checks start and end times', function () {
    var testHarmonics = new _index["default"](_constituents["default"]);
    var timeErrorMessage = false;

    try {
      testHarmonics.setTimeSpan('lkjsdlf', 'sdfklj');
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage).toBe('Invalid date format, should be a Date object, or timestamp');
    timeErrorMessage = false;

    try {
      testHarmonics.setTimeSpan(startDate, startDate);
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage).toBe('Start time must be before end time');
    timeErrorMessage = false;

    try {
      testHarmonics.setTimeSpan(startDate, endDate);
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage).toBeFalsy();
  });
  test('it parses dates correctly', function () {
    var harmonicsTime = new _index["default"](_constituents["default"]);
    var parsedDate = harmonicsTime.getDate(startDate);
    expect(parsedDate.getTime()).toBe(startDate.getTime());
    var parsedUnixDate = harmonicsTime.getDate(startDate.getTime() / 1000);
    expect(parsedUnixDate.getTime()).toBe(startDate.getTime());
  });
  test('it creates timeline correctly', function () {
    var seconds = 20 * 60;
    var harmonicsTime = new _index["default"](_constituents["default"]);
    harmonicsTime.setTimeSpan(startDate, endDate);
    var difference = Math.round((endDate.getTime() / 1000 - startDate.getTime() / 1000) / seconds) + 1;

    var _harmonicsTime$timeli = harmonicsTime.timeline(seconds),
        items = _harmonicsTime$timeli.items,
        hours = _harmonicsTime$timeli.hours;

    expect(items.length).toBe(difference);
    expect(hours.length).toBe(difference);
  });
});
