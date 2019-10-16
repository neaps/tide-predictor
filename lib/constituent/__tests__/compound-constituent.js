"use strict";

var _compoundConstituent = _interopRequireDefault(require("../compound-constituent"));

var _constituent = _interopRequireDefault(require("../constituent"));

var _astronomy = _interopRequireDefault(require("../../astronomy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sampleTime = new Date();
sampleTime.setFullYear(2019);
sampleTime.setMonth(9);
sampleTime.setDate(4);
sampleTime.setHours(10);
sampleTime.setMinutes(15);
sampleTime.setSeconds(40);
sampleTime.setMilliseconds(10);
var testAstro = (0, _astronomy["default"])(sampleTime); // This is a made-up doodson number for a test coefficient

var testConstituentA = new _constituent["default"]('testa', [1, 1, -1, 0, 0, 0, 1]);
var testConstituentB = new _constituent["default"]('testb', [0, 1, -1, 0, 0, 0, 1]);
var compoundTest = (0, _compoundConstituent["default"])('test compound', [{
  constituent: testConstituentA,
  factor: 1
}, {
  constituent: testConstituentB,
  factor: -1
}]);
describe('compund constituent', function () {
  test('it calculates compound coefficients', function () {
    expect(compoundTest.coefficients).toEqual([1, 0, 0, 0, 0, 0, 0]);
  });
  test('it calculates speed', function () {
    expect(compoundTest.speed(testAstro)).toBeCloseTo(14.4920521208, 4);
  });
  test('it calculates value', function () {
    expect(compoundTest.value(testAstro)).toBeCloseTo(268.504355062, 4);
  });
  test('it returns u correctly', function () {
    expect(compoundTest.u(testAstro)).toBe(0);
  });
  test('it returns f correctly', function () {
    expect(compoundTest.f(testAstro)).toBe(1);
  });
});
