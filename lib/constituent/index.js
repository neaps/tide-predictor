"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constituent = _interopRequireDefault(require("./constituent"));

var _compoundConstituent = _interopRequireDefault(require("./compound-constituent"));

var _nodeCorrections = _interopRequireDefault(require("../node-corrections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var constituents = {}; //Long Term

constituents.Z0 = new _constituent["default"]('Z0', 'Z ZZZ ZZZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.Sa = new _constituent["default"]('Sa', 'Z ZAZ ZZZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.Ssa = new _constituent["default"]('Ssa', 'Z ZBZ ZZZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.Mm = new _constituent["default"]('Mm', 'Z AZY ZZZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_Mm);
constituents.Mf = new _constituent["default"]('Mf', 'Z BZZ ZZZ', false, _nodeCorrections["default"].u_Mf, _nodeCorrections["default"].f_Mf); //Diurnals

constituents.Q1 = new _constituent["default"]('Q1', 'A XZA ZZA', false, _nodeCorrections["default"].u_O1, _nodeCorrections["default"].f_O1);
constituents.O1 = new _constituent["default"]('O1', 'A YZZ ZZA', false, _nodeCorrections["default"].u_O1, _nodeCorrections["default"].f_O1);
constituents.K1 = new _constituent["default"]('K1', 'A AZZ ZZY', false, _nodeCorrections["default"].u_K1, _nodeCorrections["default"].f_K1);
constituents.J1 = new _constituent["default"]('J1', 'A BZY ZZY', false, _nodeCorrections["default"].u_J1, _nodeCorrections["default"].f_J1);
constituents.M1 = new _constituent["default"]('M1', 'A ZZZ ZZA', false, _nodeCorrections["default"].u_M1, _nodeCorrections["default"].f_M1);
constituents.P1 = new _constituent["default"]('P1', 'A AXZ ZZA', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.S1 = new _constituent["default"]('S1', 'A AYZ ZZZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.OO1 = new _constituent["default"]('OO1', 'A CZZ ZZY', false, _nodeCorrections["default"].u_OO1, _nodeCorrections["default"].f_OO1); //Semi diurnals

constituents['2N2'] = new _constituent["default"]('2N2', 'B XZB ZZZ', false, _nodeCorrections["default"].u_M2, _nodeCorrections["default"].f_M2);
constituents.N2 = new _constituent["default"]('N2', 'B YZA ZZZ', false, _nodeCorrections["default"].u_M2, _nodeCorrections["default"].f_M2);
constituents.nu2 = new _constituent["default"]('nu2', 'B YBY ZZZ', false, _nodeCorrections["default"].u_M2, _nodeCorrections["default"].f_M2);
constituents.M2 = new _constituent["default"]('M2', 'B ZZZ ZZZ', false, _nodeCorrections["default"].u_M2, _nodeCorrections["default"].f_M2);
constituents.lambda2 = new _constituent["default"]('lambda2', 'B AXA ZZB', false, _nodeCorrections["default"].u_M2, _nodeCorrections["default"].f_M2);
constituents.L2 = new _constituent["default"]('L2', 'B AZY ZZB', false, _nodeCorrections["default"].u_L2, _nodeCorrections["default"].f_L2);
constituents.T2 = new _constituent["default"]('T2', 'B BWZ ZAZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.S2 = new _constituent["default"]('S2', 'B BXZ ZZZ', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.R2 = new _constituent["default"]('R2', 'B BYZ ZYB', false, _nodeCorrections["default"].u_zero, _nodeCorrections["default"].f_unity);
constituents.K2 = new _constituent["default"]('K2', 'B BZZ ZZZ', false, _nodeCorrections["default"].u_K2, _nodeCorrections["default"].f_K2); //Third diurnal

constituents.M3 = new _constituent["default"]('M3', 'C ZZZ ZZZ', false, function (a) {
  return _nodeCorrections["default"].u_Modd(a, 3);
}, function (a) {
  return _nodeCorrections["default"].f_Modd(a, 3);
}); //Compound

constituents.MSF = new _compoundConstituent["default"]('MSF', [{
  constituent: constituents.S2,
  factor: 1
}, {
  constituent: constituents.M2,
  factor: -1
}]); //Diurnal

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
}]); //Semi-Diurnal

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
}]); //Third-Diurnal

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
}]); //Quarter-Diurnal

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
}]); //Sixth-Diurnal

constituents.M6 = new _compoundConstituent["default"]('M6', [{
  constituent: constituents.M2,
  factor: 3
}]);
constituents.S6 = new _compoundConstituent["default"]('S6', [{
  constituent: constituents.S2,
  factor: 3
}]); //Eighth-Diurnals

constituents.M8 = new _compoundConstituent["default"]('M8', [{
  constituent: constituents.M2,
  factor: 4
}]);
var _default = constituents;
exports["default"] = _default;
