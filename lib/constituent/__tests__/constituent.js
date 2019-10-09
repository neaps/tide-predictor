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

var testConstituent = new _constituent["default"]('test', 'A AYZ ZZA');
describe('constituent', function () {
  test('it throws error if missing coefficients', function () {
    var errorMessage = false;

    try {
      var a = new _constituent["default"]('fail'); // eslint-disable-line
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage.message).toBe('Doodson or coefficient must be defined for a constituent');
  });
  test('it sorts Doodson numbers', function () {
    expect(_constituent.extendedDoodson.K).toBe(11);
    expect(_constituent.sortedDoodson[11]).toBe('K');
  });
  test('it converts Doodson numbers to cooeficient', function () {
    var testCooefficient = new _constituent["default"]('test', null, []);
    var coefficient = testCooefficient.doodsonNumberToCooeficient('A BZY ZZY');
    expect(coefficient).toEqual(expect.arrayContaining([1, 2, 0, -1, 0, 0, -1]));
  });
  test('it converts cooeficient to Doodson number', function () {
    var testCooefficient = new _constituent["default"]('test', null, []);
    var doodsonNumber = testCooefficient.cooeficientToDoodsonNumber([1, 2, 0, -1, 0, 0, -1]);
    expect(doodsonNumber).toEqual('ABZYZZY');
  });
  test('it creates cooeficient hashes', function () {
    var testCooefficient = new _constituent["default"]('test', null, [1, 2, 0, -1, 0, 0, -1]);
    var hash = testCooefficient.hash();
    expect(hash).toEqual('120m100m1');
  });
  test('it fetches astronimic Doodson Number values', function () {
    var values = testConstituent.astronimicDoodsonNumber(testAstro);
    expect(values[0].value).toBe(testAstro['T+h-s'].value);
  });
  test('it fetches astronimic speed', function () {
    var values = testConstituent.astronomicSpeed(testAstro);
    expect(values[0]).toBe(testAstro['T+h-s'].speed);
  });
  test('it fetches astronimic values', function () {
    var values = testConstituent.astronomicValues(testAstro);
    expect(values[0]).toBe(testAstro['T+h-s'].value);
  });
  test('it computes constituent value', function () {
    expect(testConstituent.value(testAstro)).toBeCloseTo(423.916666657, 4);
  });
  test('it compares different constituents', function () {
    var secondConstituent = new _constituent["default"]('test the same', 'A AYZ ZZA');
    var thirdConstituent = new _constituent["default"]('test different', 'A ZYZ ZZA');
    expect(testConstituent.isEqual(secondConstituent)).toBeTruthy();
    expect(testConstituent.isEqual(thirdConstituent)).toBeFalsy();
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
