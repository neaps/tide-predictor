"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.polynomial = exports.derivativePolynomial = exports["default"] = exports._xi = exports._nupp = exports._nup = exports._nu = exports._I = exports.T = exports.JD = void 0;

var _constants = require("./constants");

var _coefficients = _interopRequireDefault(require("./coefficients"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Evaluates a polynomial at argument
var polynomial = function polynomial(coefficients, argument) {
  var result = [];
  coefficients.forEach(function (coefficient, index) {
    result.push(coefficient * Math.pow(argument, index));
  });
  return result.reduce(function (a, b) {
    return a + b;
  });
}; // Evaluates a derivative polynomial at argument


exports.polynomial = polynomial;

var derivativePolynomial = function derivativePolynomial(coefficients, argument) {
  var result = [];
  coefficients.forEach(function (coefficient, index) {
    result.push(coefficient * index * Math.pow(argument, index - 1));
  });
  return result.reduce(function (a, b) {
    return a + b;
  });
}; // Meeus formula 11.1


exports.derivativePolynomial = derivativePolynomial;

var T = function T(t) {
  return (JD(t) - 2451545.0) / 36525;
}; // Meeus formula 7.1


exports.T = T;

var JD = function JD(t) {
  var Y = t.getFullYear();
  var M = t.getMonth() + 1;
  var D = t.getDate() + t.getHours() / 24.0 + t.getMinutes() / (24.0 * 60.0) + t.getSeconds() / (24.0 * 60.0 * 60.0) + t.getMilliseconds() / (24.0 * 60.0 * 60.0 * 1e6);

  if (M <= 2) {
    Y = Y - 1;
    M = M + 12;
  }

  var A = Math.floor(Y / 100.0);
  var B = 2 - A + Math.floor(A / 4.0);
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
};
/**
 * @todo - What's  with the array returned from the arccos?
 * @param {*} N
 * @param {*} i
 * @param {*} omega
 */


exports.JD = JD;

var _I = function _I(N, i, omega) {
  N = _constants.d2r * N;
  i = _constants.d2r * i;
  omega = _constants.d2r * omega;
  var cosI = Math.cos(i) * Math.cos(omega) - Math.sin(i) * Math.sin(omega) * Math.cos(N);
  return _constants.r2d * Math.acos(cosI);
};

exports._I = _I;

var _xi = function _xi(N, i, omega) {
  N = _constants.d2r * N;
  i = _constants.d2r * i;
  omega = _constants.d2r * omega;
  var e1 = Math.cos(0.5 * (omega - i)) / Math.cos(0.5 * (omega + i)) * Math.tan(0.5 * N);
  var e2 = Math.sin(0.5 * (omega - i)) / Math.sin(0.5 * (omega + i)) * Math.tan(0.5 * N);
  e1 = Math.atan(e1);
  e2 = Math.atan(e2);
  e1 = e1 - 0.5 * N;
  e2 = e2 - 0.5 * N;
  return -(e1 + e2) * _constants.r2d;
};

exports._xi = _xi;

var _nu = function _nu(N, i, omega) {
  N = _constants.d2r * N;
  i = _constants.d2r * i;
  omega = _constants.d2r * omega;
  var e1 = Math.cos(0.5 * (omega - i)) / Math.cos(0.5 * (omega + i)) * Math.tan(0.5 * N);
  var e2 = Math.sin(0.5 * (omega - i)) / Math.sin(0.5 * (omega + i)) * Math.tan(0.5 * N);
  e1 = Math.atan(e1);
  e2 = Math.atan(e2);
  e1 = e1 - 0.5 * N;
  e2 = e2 - 0.5 * N;
  return (e1 - e2) * _constants.r2d;
}; // Schureman equation 224


exports._nu = _nu;

var _nup = function _nup(N, i, omega) {
  var I = _constants.d2r * _I(N, i, omega);

  var nu = _constants.d2r * _nu(N, i, omega);

  return _constants.r2d * Math.atan(Math.sin(2 * I) * Math.sin(nu) / (Math.sin(2 * I) * Math.cos(nu) + 0.3347));
}; // Schureman equation 232


exports._nup = _nup;

var _nupp = function _nupp(N, i, omega) {
  var I = _constants.d2r * _I(N, i, omega);

  var nu = _constants.d2r * _nu(N, i, omega);

  var tan2nupp = Math.pow(Math.sin(I), 2) * Math.sin(2 * nu) / (Math.pow(Math.sin(I), 2) * Math.cos(2 * nu) + 0.0727);
  return _constants.r2d * 0.5 * Math.atan(tan2nupp);
};

exports._nupp = _nupp;

var modulus = function modulus(a, b) {
  return (a % b + b) % b;
};

var astro = function astro(time) {
  var result = {};
  var polynomials = {
    s: _coefficients["default"].lunarLongitude,
    h: _coefficients["default"].solarLongitude,
    p: _coefficients["default"].lunarPerigee,
    N: _coefficients["default"].lunarNode,
    pp: _coefficients["default"].solarPerigee,
    90: [90.0],
    omega: _coefficients["default"].terrestrialObliquity,
    i: _coefficients["default"].lunarInclination
  }; // Polynomials are in T, that is Julian Centuries; we want our speeds to be
  // in the more convenient unit of degrees per hour.

  var dTdHour = 1 / (24 * 365.25 * 100);
  Object.keys(polynomials).forEach(function (name) {
    result[name] = {
      value: modulus(polynomial(polynomials[name], T(time)), 360.0),
      speed: derivativePolynomial(polynomials[name], T(time)) * dTdHour
    };
  }); // Some other parameters defined by Schureman which are dependent on the
  // parameters N, i, omega for use in node factor calculations. We don't need
  // their speeds.

  var functions = {
    I: _I,
    xi: _xi,
    nu: _nu,
    nup: _nup,
    nupp: _nupp
  };
  Object.keys(functions).forEach(function (name) {
    var functionCall = functions[name];
    result[name] = {
      value: modulus(functionCall(result.N.value, result.i.value, result.omega.value), 360.0),
      speed: null
    };
  }); // We don't work directly with the T (hours) parameter, instead our spanning
  // set for equilibrium arguments #is given by T+h-s, s, h, p, N, pp, 90.
  // This is in line with convention.

  var hour = {
    value: (JD(time) - Math.floor(JD(time))) * 360.0,
    speed: 15.0
  };
  result['T+h-s'] = {
    value: hour.value + result.h.value - result.s.value,
    speed: hour.speed + result.h.speed - result.s.speed
  }; // It is convenient to calculate Schureman's P here since several node
  // factors need it, although it could be argued that these
  // (along with I, xi, nu etc) belong somewhere else.

  result.P = {
    value: result.p.value - result.xi.value % 360.0,
    speed: null
  };
  return result;
};

var _default = astro;
exports["default"] = _default;
