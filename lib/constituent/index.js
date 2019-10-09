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

constituents.Z0 = new _constituent["default"]('Z0', 'Z ZZZ ZZZ', false, _index["default"].uZero, _index["default"].fUnity);
constituents.Sa = new _constituent["default"]('Sa', 'Z ZAZ ZZZ', false, _index["default"].uZero, _index["default"].fUnity);
constituents.Ssa = new _constituent["default"]('Ssa', 'Z ZBZ ZZZ', false, _index["default"].uZero, _index["default"].fUnity);
constituents.Mm = new _constituent["default"]('Mm', 'Z AZY ZZZ', false, _index["default"].uZero, _index["default"].fMm);
constituents.Mf = new _constituent["default"]('Mf', 'Z BZZ ZZZ', false, _index["default"].uMf, _index["default"].fMf); // Diurnals

constituents.Q1 = new _constituent["default"]('Q1', 'A XZA ZZA', false, _index["default"].uO1, _index["default"].fO1);
constituents.O1 = new _constituent["default"]('O1', 'A YZZ ZZA', false, _index["default"].uO1, _index["default"].fO1);
constituents.K1 = new _constituent["default"]('K1', 'A AZZ ZZY', false, _index["default"].uK1, _index["default"].fK1);
constituents.J1 = new _constituent["default"]('J1', 'A BZY ZZY', false, _index["default"].uJ1, _index["default"].fJ1);
constituents.M1 = new _constituent["default"]('M1', 'A ZZZ ZZA', false, _index["default"].uM1, _index["default"].fM1);
constituents.P1 = new _constituent["default"]('P1', 'A AXZ ZZA', false, _index["default"].uZero, _index["default"].fUnity);
constituents.S1 = new _constituent["default"]('S1', 'A AYZ ZZZ', false, _index["default"].uZero, _index["default"].fUnity);
constituents.OO1 = new _constituent["default"]('OO1', 'A CZZ ZZY', false, _index["default"].uOO1, _index["default"].fOO1); // Semi diurnals

constituents['2N2'] = new _constituent["default"]('2N2', 'B XZB ZZZ', false, _index["default"].uM2, _index["default"].fM2);
constituents.N2 = new _constituent["default"]('N2', 'B YZA ZZZ', false, _index["default"].uM2, _index["default"].fM2);
constituents.nu2 = new _constituent["default"]('nu2', 'B YBY ZZZ', false, _index["default"].uM2, _index["default"].fM2);
constituents.M2 = new _constituent["default"]('M2', 'B ZZZ ZZZ', false, _index["default"].uM2, _index["default"].fM2);
constituents.lambda2 = new _constituent["default"]('lambda2', 'B AXA ZZB', false, _index["default"].uM2, _index["default"].fM2);
constituents.L2 = new _constituent["default"]('L2', 'B AZY ZZB', false, _index["default"].uL2, _index["default"].fL2);
constituents.T2 = new _constituent["default"]('T2', 'B BWZ ZAZ', false, _index["default"].uZero, _index["default"].fUnity);
constituents.S2 = new _constituent["default"]('S2', 'B BXZ ZZZ', false, _index["default"].uZero, _index["default"].fUnity);
constituents.R2 = new _constituent["default"]('R2', 'B BYZ ZYB', false, _index["default"].uZero, _index["default"].fUnity);
constituents.K2 = new _constituent["default"]('K2', 'B BZZ ZZZ', false, _index["default"].uK2, _index["default"].fK2); // Third diurnal

constituents.M3 = new _constituent["default"]('M3', 'C ZZZ ZZZ', false, function (a) {
  return _index["default"].uModd(a, 3);
}, function (a) {
  return _index["default"].fModd(a, 3);
}); // Compound

constituents.MSF = new _compoundConstituent["default"]('MSF', [{
  constituent: constituents.S2,
  factor: 1
}, {
  constituent: constituents.M2,
  factor: -1
}]); // Diurnal

constituents['2Q1'] = new _compoundConstituent["default"]('2Q1', [{
  constituent: constituents.N2,
  factor: 1
}, {
  constituent: constituents.J1,
  factor: -1
}]);
constituents.rho1 = new _compoundConstituent["default"]('rho1', [{
  constituent: constituents.nu2,
  factor: 1
}, {
  constituent: constituents.K1,
  factor: -1
}]); // Semi-Diurnal

constituents.mu2 = new _compoundConstituent["default"]('mu2', [{
  constituent: constituents.M2,
  factor: 2
}, {
  constituent: constituents.S2,
  factor: -1
}]);
constituents['2SM2'] = new _compoundConstituent["default"]('2SM2', [{
  constituent: constituents.S2,
  factor: 2
}, {
  constituent: constituents.M2,
  factor: -1
}]); // Third-Diurnal

constituents['2MK3'] = new _compoundConstituent["default"]('2MK3', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.O1,
  factor: 1
}]);
constituents.MK3 = new _compoundConstituent["default"]('MK3', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.K1,
  factor: 1
}]); // Quarter-Diurnal

constituents.MN4 = new _compoundConstituent["default"]('MN4', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.N2,
  factor: 1
}]);
constituents.M4 = new _compoundConstituent["default"]('M4', [{
  constituent: constituents.M2,
  factor: 2
}]);
constituents.MS4 = new _compoundConstituent["default"]('MS4', [{
  constituent: constituents.M2,
  factor: 1
}, {
  constituent: constituents.S2,
  factor: 1
}]);
constituents.S4 = new _compoundConstituent["default"]('S4', [{
  constituent: constituents.S2,
  factor: 2
}]); // Sixth-Diurnal

constituents.M6 = new _compoundConstituent["default"]('M6', [{
  constituent: constituents.M2,
  factor: 3
}]);
constituents.S6 = new _compoundConstituent["default"]('S6', [{
  constituent: constituents.S2,
  factor: 3
}]); // Eighth-Diurnals

constituents.M8 = new _compoundConstituent["default"]('M8', [{
  constituent: constituents.M2,
  factor: 4
}]);
var _default = constituents;
exports["default"] = _default;
