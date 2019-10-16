"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constituent = _interopRequireDefault(require("./constituent"));

var _compoundConstituent = _interopRequireDefault(require("./compound-constituent"));

var _index = _interopRequireDefault(require("../node-corrections/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var constituents = {}; // Long Term

constituents.Z0 = (0, _constituent["default"])('Z0', [0, 0, 0, 0, 0, 0, 0], _index["default"].uZero, _index["default"].fUnity);
constituents.SA = (0, _constituent["default"])('Sa', [0, 0, 1, 0, 0, 0, 0], _index["default"].uZero, _index["default"].fUnity);
constituents.SSA = (0, _constituent["default"])('Ssa', [0, 0, 2, 0, 0, 0, 0], _index["default"].uZero, _index["default"].fUnity);
constituents.MM = (0, _constituent["default"])('MM', [0, 1, 0, -1, 0, 0, 0], _index["default"].uZero, _index["default"].fMm);
constituents.MF = (0, _constituent["default"])('MF', [0, 2, 0, 0, 0, 0, 0], _index["default"].uMf, _index["default"].fMf); // Diurnals

constituents.Q1 = (0, _constituent["default"])('Q1', [1, -2, 0, 1, 0, 0, 1], _index["default"].uO1, _index["default"].fO1);
constituents.O1 = (0, _constituent["default"])('O1', [1, -1, 0, 0, 0, 0, 1], _index["default"].uO1, _index["default"].fO1);
constituents.K1 = (0, _constituent["default"])('K1', [1, 1, 0, 0, 0, 0, -1], _index["default"].uK1, _index["default"].fK1);
constituents.J1 = (0, _constituent["default"])('J1', [1, 2, 0, -1, 0, 0, -1], _index["default"].uJ1, _index["default"].fJ1);
constituents.M1 = (0, _constituent["default"])('M1', [1, 0, 0, 0, 0, 0, 1], _index["default"].uM1, _index["default"].fM1);
constituents.P1 = (0, _constituent["default"])('P1', [1, 1, -2, 0, 0, 0, 1], _index["default"].uZero, _index["default"].fUnity);
constituents.S1 = (0, _constituent["default"])('S1', [1, 1, -1, 0, 0, 0, 0], _index["default"].uZero, _index["default"].fUnity);
constituents.OO1 = (0, _constituent["default"])('OO1', [1, 3, 0, 0, 0, 0, -1], _index["default"].uOO1, _index["default"].fOO1); // Semi diurnals

constituents['2N2'] = (0, _constituent["default"])('2N2', [2, -2, 0, 2, 0, 0, 0], _index["default"].uM2, _index["default"].fM2);
constituents.N2 = (0, _constituent["default"])('N2', [2, -1, 0, 1, 0, 0, 0], _index["default"].uM2, _index["default"].fM2);
constituents.NU2 = (0, _constituent["default"])('NU2', [2, -1, 2, -1, 0, 0, 0], _index["default"].uM2, _index["default"].fM2);
constituents.M2 = (0, _constituent["default"])('M2', [2, 0, 0, 0, 0, 0, 0], _index["default"].uM2, _index["default"].fM2);
constituents.LAM2 = (0, _constituent["default"])('LAM2', [2, 1, -2, 1, 0, 0, 2], _index["default"].uM2, _index["default"].fM2);
constituents.L2 = (0, _constituent["default"])('L2', [2, 1, 0, -1, 0, 0, 2], _index["default"].uL2, _index["default"].fL2);
constituents.T2 = (0, _constituent["default"])('T2', [2, 2, -3, 0, 0, 1, 0], _index["default"].uZero, _index["default"].fUnity);
constituents.S2 = (0, _constituent["default"])('S2', [2, 2, -2, 0, 0, 0, 0], _index["default"].uZero, _index["default"].fUnity);
constituents.R2 = (0, _constituent["default"])('R2', [2, 2, -1, 0, 0, -1, 2], _index["default"].uZero, _index["default"].fUnity);
constituents.K2 = (0, _constituent["default"])('K2', [2, 2, 0, 0, 0, 0, 0], _index["default"].uK2, _index["default"].fK2); // Third diurnal

constituents.M3 = (0, _constituent["default"])('M3', [3, 0, 0, 0, 0, 0, 0], function (a) {
  return _index["default"].uModd(a, 3);
}, function (a) {
  return _index["default"].fModd(a, 3);
}); // Compound

constituents.MSF = (0, _compoundConstituent["default"])('MSF', [{
  constituent: constituents.S2,
  factor: 1
}, {
  constituent: constituents.M2,
  factor: -1
}]); // Diurnal

constituents['2Q1'] = (0, _compoundConstituent["default"])('2Q1', [{
  constituent: constituents.N2,
  factor: 1
}, {
  constituent: constituents.J1,
  factor: -1
}]);
constituents.RHO = (0, _compoundConstituent["default"])('RHO', [{
  constituent: constituents.NU2,
  factor: 1
}, {
  constituent: constituents.K1,
  factor: -1
}]); // Semi-Diurnal

constituents.MU2 = (0, _compoundConstituent["default"])('MU2', [{
  constituent: constituents.M2,
  factor: 2
}, {
  constituent: constituents.S2,
  factor: -1
}]);
constituents['2SM2'] = (0, _compoundConstituent["default"])('2SM2', [{
  constituent: constituents.S2,
  factor: 2
}, {
  constituent: constituents.M2,
  factor: -1
}]); // Third-Diurnal

constituents['2MK3'] = (0, _compoundConstituent["default"])('2MK3', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.O1,
  factor: 1
}]);
constituents.MK3 = (0, _compoundConstituent["default"])('MK3', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.K1,
  factor: 1
}]); // Quarter-Diurnal

constituents.MN4 = (0, _compoundConstituent["default"])('MN4', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.N2,
  factor: 1
}]);
constituents.M4 = (0, _compoundConstituent["default"])('M4', [{
  constituent: constituents.M2,
  factor: 2
}]);
constituents.MS4 = (0, _compoundConstituent["default"])('MS4', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.S2,
  factor: 1
}]);
constituents.S4 = (0, _compoundConstituent["default"])('S4', [{
  constituent: constituents.S2,
  factor: 2
}]); // Sixth-Diurnal

constituents.M6 = (0, _compoundConstituent["default"])('M6', [{
  constituent: constituents.M2,
  factor: 3
}]);
constituents.S6 = (0, _compoundConstituent["default"])('S6', [{
  constituent: constituents.S2,
  factor: 3
}]); // Eighth-Diurnals

constituents.M8 = (0, _compoundConstituent["default"])('M8', [{
  constituent: constituents.M2,
  factor: 4
}]);
var _default = constituents;
exports["default"] = _default;
