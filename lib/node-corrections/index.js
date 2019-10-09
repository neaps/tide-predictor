"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var corrections = {
  fUnity: function fUnity() {
    return 1;
  },
  // Schureman equations 73, 65
  fMm: function fMm(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = (2 / 3.0 - Math.pow(Math.sin(omega), 2)) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    return (2 / 3.0 - Math.pow(Math.sin(I), 2)) / mean;
  },
  // Schureman equations 74, 66
  fMf: function fMf(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.pow(Math.sin(omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.pow(Math.sin(I), 2) / mean;
  },
  // Schureman equations 75, 67
  fO1: function fO1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.sin(omega) * Math.pow(Math.cos(0.5 * omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.sin(I) * Math.pow(Math.cos(0.5 * I), 2) / mean;
  },
  // Schureman equations 76, 68
  fJ1: function fJ1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.sin(2 * omega) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    return Math.sin(2 * I) / mean;
  },
  // Schureman equations 77, 69
  fOO1: function fOO1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.sin(omega) * Math.pow(Math.sin(0.5 * omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.sin(I) * Math.pow(Math.sin(0.5 * I), 2) / mean;
  },
  // Schureman equations 78, 70
  fM2: function fM2(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.pow(Math.cos(0.5 * omega), 4) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.pow(Math.cos(0.5 * I), 4) / mean;
  },
  // Schureman equations 227, 226, 68
  // Should probably eventually include the derivations of the magic numbers (0.5023 etc).
  fK1: function fK1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var nu = _constants.d2r * a.nu.value;
    var sin2IcosnuMean = Math.sin(2 * omega) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    var mean = 0.5023 * sin2IcosnuMean + 0.1681;
    return Math.pow(0.2523 * Math.pow(Math.sin(2 * I), 2) + 0.1689 * Math.sin(2 * I) * Math.cos(nu) + 0.0283, 0.5) / mean;
  },
  // Schureman equations 215, 213, 204
  // It can be (and has been) confirmed that the exponent for R_a reads 1/2 via Schureman Table 7
  fL2: function fL2(a) {
    var P = _constants.d2r * a.P.value;
    var I = _constants.d2r * a.I.value;
    var rAInv = Math.pow(1 - 12 * Math.pow(Math.tan(0.5 * I), 2) * Math.cos(2 * P) + 36 * Math.pow(Math.tan(0.5 * I), 4), 0.5);
    return corrections.fM2(a) * rAInv;
  },
  // Schureman equations 235, 234, 71
  // Again, magic numbers
  fK2: function fK2(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var nu = _constants.d2r * a.nu.value;
    var sinsqIcos2nuMean = Math.pow(Math.sin(omega), 2) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    var mean = 0.5023 * sinsqIcos2nuMean + 0.0365;
    return Math.pow(0.2523 * Math.pow(Math.sin(I), 4) + 0.0367 * Math.pow(Math.sin(I), 2) * Math.cos(2 * nu) + 0.0013, 0.5) / mean;
  },
  // Schureman equations 206, 207, 195
  fM1: function fM1(a) {
    var P = _constants.d2r * a.P.value;
    var I = _constants.d2r * a.I.value;
    var qAInv = Math.pow(0.25 + 1.5 * Math.cos(I) * Math.cos(2 * P) * Math.pow(Math.cos(0.5 * I), -0.5) + 2.25 * Math.pow(Math.cos(I), 2) * Math.pow(Math.cos(0.5 * I), -4), 0.5);
    return corrections.fO1(a) * qAInv;
  },
  // See e.g. Schureman equation 149
  fModd: function fModd(a, n) {
    return Math.pow(corrections.fM2(a), n / 2.0);
  },
  // Node factors u, see Table 2 of Schureman.
  uZero: function uZero(a) {
    return 0.0;
  },
  uMf: function uMf(a) {
    return -2.0 * a.xi.value;
  },
  uO1: function uO1(a) {
    return 2.0 * a.xi.value - a.nu.value;
  },
  uJ1: function uJ1(a) {
    return -a.nu.value;
  },
  uOO1: function uOO1(a) {
    return -2.0 * a.xi.value - a.nu.value;
  },
  uM2: function uM2(a) {
    return 2.0 * a.xi.value - 2.0 * a.nu.value;
  },
  uK1: function uK1(a) {
    return -a.nup.value;
  },
  // Schureman 214
  uL2: function uL2(a) {
    var I = _constants.d2r * a.I.value;
    var P = _constants.d2r * a.P.value;
    var R = _constants.r2d * Math.atan(Math.sin(2 * P) / (1 / 6.0 * Math.pow(Math.tan(0.5 * I), -2) - Math.cos(2 * P)));
    return 2.0 * a.xi.value - 2.0 * a.nu.value - R;
  },
  uK2: function uK2(a) {
    return -2.0 * a.nupp.value;
  },
  // Schureman 202
  uM1: function uM1(a) {
    var I = _constants.d2r * a.I.value;
    var P = _constants.d2r * a.P.value;
    var Q = _constants.r2d * Math.atan((5 * Math.cos(I) - 1) / (7 * Math.cos(I) + 1) * Math.tan(P));
    return a.xi.value - a.nu.value + Q;
  },
  uModd: function uModd(a, n) {
    return n / 2.0 * corrections.uM2(a);
  }
};
var _default = corrections;
exports["default"] = _default;
