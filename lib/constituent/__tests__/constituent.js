"use strict";

var _constituent = _interopRequireWildcard(require("../constituent"));

var _astronomy = _interopRequireDefault(require("../../astronomy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var sampleTime = new Date();
sampleTime.setFullYear(2019);
sampleTime.setMonth(9);
sampleTime.setDate(4);
sampleTime.setHours(10);
sampleTime.setMinutes(15);
sampleTime.setSeconds(40);
sampleTime.setMilliseconds(10);
var testAstro = (0, _astronomy["default"])(sampleTime); // This is a made-up doodson number for a test coefficient

var testConstituent = (0, _constituent["default"])('test', [1, 1, -1, 0, 0, 0, 1]);
describe('constituent', function () {
  test('it throws error if missing coefficients', function () {
    var errorMessage = false;

    try {
      var a = (0, _constituent["default"])('fail'); // eslint-disable-line
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toBe('Coefficient must be defined for a constituent');
  });
  test('it fetches astronimic Doodson Number values', function () {
    var values = (0, _constituent.astronimicDoodsonNumber)(testAstro);
    expect(values[0].value).toBe(testAstro['T+h-s'].value);
  });
  test('it fetches astronimic speed', function () {
    var values = (0, _constituent.astronomicSpeed)(testAstro);
    expect(values[0]).toBe(testAstro['T+h-s'].speed);
  });
  test('it fetches astronimic values', function () {
    var values = (0, _constituent.astronomicValues)(testAstro);
    expect(values[0]).toBe(testAstro['T+h-s'].value);
  });
  test('it computes constituent value', function () {
    expect(testConstituent.value(testAstro)).toBeCloseTo(423.916666657, 4);
  });
  test('it computes constituent speed', function () {
    expect(testConstituent.speed(testAstro)).toBe(15);
  });
  test('it returns u correctly', function () {
    expect(testConstituent.u(testAstro)).toBe(0);
  });
  test('it returns f correctly', function () {
    expect(testConstituent.f(testAstro)).toBe(1);
  });
});
