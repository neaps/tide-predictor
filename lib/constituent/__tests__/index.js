"use strict";

var _index = _interopRequireDefault(require("../index"));

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
var testAstro = (0, _astronomy["default"])(sampleTime);
describe('Base constituent definitions', function () {
  test('it prepared constituent Sa', function () {
    expect(_index["default"].Sa.value(testAstro)).toBeCloseTo(192.826398978, 4);
  });
  test('it prepared constituent Ssa', function () {
    expect(_index["default"].Ssa.value(testAstro)).toBeCloseTo(385.652797955, 4);
  });
  test('it prepared constituent M2', function () {
    expect(_index["default"].M2.value(testAstro)).toBeCloseTo(537.008710124, 4);
    expect(_index["default"].M2.u(testAstro)).toBeCloseTo(-2.07725095711, 4);
    expect(_index["default"].M2.f(testAstro)).toBeCloseTo(1.00853563237, 4);
  });
  test('has a correct lambda for M3', function () {
    expect(_index["default"].M3.u(testAstro)).toBeCloseTo(-3.11587643567, 4);
    expect(_index["default"].M3.f(testAstro)).toBeCloseTo(1.01283073119, 4);
  });
});
