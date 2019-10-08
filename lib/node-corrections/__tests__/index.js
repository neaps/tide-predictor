"use strict";

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testItems = {
  i: {
    value: 5
  },
  I: {
    value: 6
  },
  omega: {
    value: 3
  },
  nu: {
    value: 4
  },
  nup: {
    value: 4
  },
  nupp: {
    value: 2
  },
  P: {
    value: 14
  },
  xi: {
    value: 4
  }
};
describe('Node corrections', function () {
  test('have correct unity', function () {
    expect(_index["default"].f_unity()).toBe(1);
  });
  test('calculates Schureman equations 73, 65 (f_Mm)', function () {
    expect(_index["default"].f_Mm(testItems)).toBeCloseTo(0.999051998091, 4);
  });
  test('calculates Schureman equations 74, 66 (f_Mf)', function () {
    expect(_index["default"].f_Mf(testItems)).toBeCloseTo(4.00426673883, 4);
  });
  test('calculates Schureman equations 75, 67 (f_O1)', function () {
    expect(_index["default"].f_O1(testItems)).toBeCloseTo(2.00076050158, 4);
  });
  test('calculates Schureman equations 76, 68 (f_J1)', function () {
    expect(_index["default"].f_J1(testItems)).toBeCloseTo(2.0119685329, 4);
  });
  test('calculates Schureman equations 77, 69 (f_OO1)', function () {
    expect(_index["default"].f_OO1(testItems)).toBeCloseTo(8.01402871709, 4);
  });
  test('calculates Schureman equations 78, 70 (f_M2)', function () {
    expect(_index["default"].f_M2(testItems)).toBeCloseTo(0.999694287563, 4);
  });
  test('calculates Schureman equations 227, 226, 68 (f_K1)', function () {
    expect(_index["default"].f_K1(testItems)).toBeCloseTo(1.23843964182, 4);
  });
  test('calculates Schureman equations 215, 213, 204 (f_L2)', function () {
    expect(_index["default"].f_L2(testItems)).toBeCloseTo(0.98517860327, 4);
  });
  test('calculates Schureman equations 235, 234, 71 (f_K2)', function () {
    expect(_index["default"].f_K2(testItems)).toBeCloseTo(1.09775430048, 4);
  });
  test('calculates Schureman equations 206, 207, 195 (f_M1)', function () {
    expect(_index["default"].f_M1(testItems)).toBeCloseTo(3.90313810168, 4);
  });
  test('calculates e.g. Schureman equation 149 (f_Modd)', function () {
    expect(_index["default"].f_Modd(testItems, 3)).toBeCloseTo(0.999541466395, 4);
  });
  test('has a zero for u_zero', function () {
    expect(_index["default"].u_zero()).toBe(0.0);
  });
  test('calculates u_Mf', function () {
    expect(_index["default"].u_Mf(testItems)).toBe(-8.0);
  });
  test('calculates u_O1', function () {
    expect(_index["default"].u_O1(testItems)).toBe(4.0);
  });
  test('calculates u_J1', function () {
    expect(_index["default"].u_J1(testItems)).toBe(-4);
  });
  test('calculates u_OO1', function () {
    expect(_index["default"].u_OO1(testItems)).toBe(-12.0);
  });
  test('calculates u_M2', function () {
    expect(_index["default"].u_M2(testItems)).toBe(0.0);
  });
  test('calculates u_K1', function () {
    expect(_index["default"].u_K1(testItems)).toBe(-4);
  });
  test('calculates u_L2', function () {
    expect(_index["default"].u_L2(testItems)).toBeCloseTo(-0.449812364499, 4);
  });
  test('calculates u_K2', function () {
    expect(_index["default"].u_K2(testItems)).toBe(-4.0);
  });
  test('calculates u_K2', function () {
    expect(_index["default"].u_K2(testItems)).toBe(-4.0);
  });
  test('calculates u_M1', function () {
    expect(_index["default"].u_M1(testItems)).toBeCloseTo(7.09154172301, 4);
  });
  test('calculates u_Modd', function () {
    expect(_index["default"].u_Modd(testItems, 3)).toBe(0);
  });
});
