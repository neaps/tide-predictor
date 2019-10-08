"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = require("../constants");

var corrections = {
  f_unity: function f_unity() {
    return 1;
  },
  //// Schureman equations 73, 65
  f_Mm: function f_Mm(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = (2 / 3.0 - Math.pow(Math.sin(omega), 2)) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    return (2 / 3.0 - Math.pow(Math.sin(I), 2)) / mean;
  },
  //Schureman equations 74, 66
  f_Mf: function f_Mf(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.pow(Math.sin(omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.pow(Math.sin(I), 2) / mean;
  },
  // Schureman equations 75, 67
  f_O1: function f_O1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.sin(omega) * Math.pow(Math.cos(0.5 * omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.sin(I) * Math.pow(Math.cos(0.5 * I), 2) / mean;
  },
  //Schureman equations 76, 68
  f_J1: function f_J1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.sin(2 * omega) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    return Math.sin(2 * I) / mean;
  },
  // Schureman equations 77, 69
  f_OO1: function f_OO1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.sin(omega) * Math.pow(Math.sin(0.5 * omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.sin(I) * Math.pow(Math.sin(0.5 * I), 2) / mean;
  },
  // Schureman equations 78, 70
  f_M2: function f_M2(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var mean = Math.pow(Math.cos(0.5 * omega), 4) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.pow(Math.cos(0.5 * I), 4) / mean;
  },
  // Schureman equations 227, 226, 68
  // Should probably eventually include the derivations of the magic numbers (0.5023 etc).
  f_K1: function f_K1(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var nu = _constants.d2r * a.nu.value;
    var sin2Icosnu_mean = Math.sin(2 * omega) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    var mean = 0.5023 * sin2Icosnu_mean + 0.1681;
    return Math.pow(0.2523 * Math.pow(Math.sin(2 * I), 2) + 0.1689 * Math.sin(2 * I) * Math.cos(nu) + 0.0283, 0.5) / mean;
  },
  // Schureman equations 215, 213, 204
  // It can be (and has been) confirmed that the exponent for R_a reads 1/2 via Schureman Table 7
  f_L2: function f_L2(a) {
    var P = _constants.d2r * a.P.value;
    var I = _constants.d2r * a.I.value;
    var R_a_inv = Math.pow(1 - 12 * Math.pow(Math.tan(0.5 * I), 2) * Math.cos(2 * P) + 36 * Math.pow(Math.tan(0.5 * I), 4), 0.5);
    return corrections.f_M2(a) * R_a_inv;
  },
  // Schureman equations 235, 234, 71
  // Again, magic numbers
  f_K2: function f_K2(a) {
    var omega = _constants.d2r * a.omega.value;
    var i = _constants.d2r * a.i.value;
    var I = _constants.d2r * a.I.value;
    var nu = _constants.d2r * a.nu.value;
    var sinsqIcos2nu_mean = Math.pow(Math.sin(omega), 2) * (1 - 3 / 2.0 * Math.pow(Math.sin(i), 2));
    var mean = 0.5023 * sinsqIcos2nu_mean + 0.0365;
    return Math.pow(0.2523 * Math.pow(Math.sin(I), 4) + 0.0367 * Math.pow(Math.sin(I), 2) * Math.cos(2 * nu) + 0.0013, 0.5) / mean;
  },
  // Schureman equations 206, 207, 195
  f_M1: function f_M1(a) {
    var P = _constants.d2r * a.P.value;
    var I = _constants.d2r * a.I.value;
    var Q_a_inv = Math.pow(0.25 + 1.5 * Math.cos(I) * Math.cos(2 * P) * Math.pow(Math.cos(0.5 * I), -0.5) + 2.25 * Math.pow(Math.cos(I), 2) * Math.pow(Math.cos(0.5 * I), -4), 0.5);
    return corrections.f_O1(a) * Q_a_inv;
  },
  // See e.g. Schureman equation 149
  f_Modd: function f_Modd(a, n) {
    return Math.pow(corrections.f_M2(a), n / 2.0);
  },
  // Node factors u, see Table 2 of Schureman.
  u_zero: function u_zero(a) {
    return 0.0;
  },
  u_Mf: function u_Mf(a) {
    return -2.0 * a.xi.value;
  },
  u_O1: function u_O1(a) {
    return 2.0 * a.xi.value - a.nu.value;
  },
  u_J1: function u_J1(a) {
    return -a.nu.value;
  },
  u_OO1: function u_OO1(a) {
    return -2.0 * a.xi.value - a.nu.value;
  },
  u_M2: function u_M2(a) {
    return 2.0 * a.xi.value - 2.0 * a.nu.value;
  },
  u_K1: function u_K1(a) {
    return -a.nup.value;
  },
  //Schureman 214
  u_L2: function u_L2(a) {
    var I = _constants.d2r * a.I.value;
    var P = _constants.d2r * a.P.value;
    var R = _constants.r2d * Math.atan(Math.sin(2 * P) / (1 / 6.0 * Math.pow(Math.tan(0.5 * I), -2) - Math.cos(2 * P)));
    return 2.0 * a.xi.value - 2.0 * a.nu.value - R;
  },
  u_K2: function u_K2(a) {
    return -2.0 * a.nupp.value;
  },
  //Schureman 202
  u_M1: function u_M1(a) {
    var I = _constants.d2r * a.I.value;
    var P = _constants.d2r * a.P.value;
    var Q = _constants.r2d * Math.atan((5 * Math.cos(I) - 1) / (7 * Math.cos(I) + 1) * Math.tan(P));
    return a.xi.value - a.nu.value + Q;
  },
  u_Modd: function u_Modd(a, n) {
    return n / 2.0 * corrections.u_M2(a);
  }
};
var _default = corrections;
exports["default"] = _default;
