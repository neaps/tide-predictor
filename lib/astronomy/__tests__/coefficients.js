"use strict";

var _coefficients = _interopRequireWildcard(require("../coefficients"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

describe('astronomy coefficients', function () {
  test('converts a sexagesimal angle into decimal degrees', function () {
    expect((0, _coefficients.sexagesimalToDecimal)(10, 10, 10, 10, 10)).toBe(10.169447225);
    expect((0, _coefficients.sexagesimalToDecimal)(10)).toBe(10);
  });
  test('calculates terrestrial oliquity coefficients rewritten to T', function () {
    expect(_coefficients["default"].terrestrialObliquity[1]).toBe(-0.013002583333333335);
  });
});
