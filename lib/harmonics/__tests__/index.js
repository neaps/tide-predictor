"use strict";

var _index = _interopRequireWildcard(require("../index"));

var _constituents = _interopRequireDefault(require("../__mocks__/constituents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var startDate = new Date(1567346400 * 1000); // 2019-09-01

var endDate = new Date(1569966078 * 1000); // 2019-10-01

describe('harmonics', function () {
  test('it checks constituents', function () {
    var errorMessage = false;
    var testHarmonics = {}; // eslint-disable-line

    try {
      testHarmonics = (0, _index["default"])('not array');
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toBe('Harmonic constituents are not an array');
    errorMessage = false;

    try {
      testHarmonics = (0, _index["default"])([{
        name: 'M2',
        description: 'Principal lunar semidiurnal constituent',
        amplitude: 1.61,
        phase_GMT: 181.3,
        phase_local: 309.4,
        speed: 28.984104
      }, {
        description: 'Principal solar semidiurnal constituent',
        amplitude: 0.43,
        phase_GMT: 180.1,
        phase_local: 309.4
      }]);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toBe('Harmonic constituents must have a name property');
  });
  test('it checks start and end times', function () {
    var testHarmonics = (0, _index["default"])(_constituents["default"]);
    var timeErrorMessage = false;

    try {
      testHarmonics.setTimeSpan('lkjsdlf', 'sdfklj');
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage.message).toBe('Invalid date format, should be a Date object, or timestamp');
    timeErrorMessage = false;

    try {
      testHarmonics.setTimeSpan(startDate, startDate);
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage.message).toBe('Start time must be before end time');
    timeErrorMessage = false;

    try {
      testHarmonics.setTimeSpan(startDate, endDate);
    } catch (error) {
      timeErrorMessage = error;
    }

    expect(timeErrorMessage.message).toBeFalsy();
  });
  test('it parses dates correctly', function () {
    var parsedDate = (0, _index.getDate)(startDate);
    expect(parsedDate.getTime()).toBe(startDate.getTime());
    var parsedUnixDate = (0, _index.getDate)(startDate.getTime() / 1000);
    expect(parsedUnixDate.getTime()).toBe(startDate.getTime());
  });
  test('it creates timeline correctly', function () {
    var seconds = 20 * 60;
    var difference = Math.round((endDate.getTime() / 1000 - startDate.getTime() / 1000) / seconds) + 1;

    var _getTimeline = (0, _index.getTimeline)(startDate, endDate, seconds),
        items = _getTimeline.items,
        hours = _getTimeline.hours;

    expect(items.length).toBe(difference);
    expect(hours.length).toBe(difference);
  });
});
