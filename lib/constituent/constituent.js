"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.astronomicValues = exports.astronomicSpeed = exports.astronimicDoodsonNumber = exports["default"] = void 0;

var _index = _interopRequireDefault(require("../node-corrections/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Computes the dot notation of two arrays
 * @param {*} a
 * @param {*} b
 */
var dotArray = function dotArray(a, b) {
  var results = [];
  a.forEach(function (value, index) {
    results.push(value * b[index]);
  });
  return results.reduce(function (total, value) {
    return total + value;
  });
};

var astronimicDoodsonNumber = function astronimicDoodsonNumber(astro) {
  return [astro['T+h-s'], astro.s, astro.h, astro.p, astro.N, astro.pp, astro['90']];
};

exports.astronimicDoodsonNumber = astronimicDoodsonNumber;

var astronomicSpeed = function astronomicSpeed(astro) {
  var results = [];
  astronimicDoodsonNumber(astro).forEach(function (number) {
    results.push(number.speed);
  });
  return results;
};

exports.astronomicSpeed = astronomicSpeed;

var astronomicValues = function astronomicValues(astro) {
  var results = [];
  astronimicDoodsonNumber(astro).forEach(function (number) {
    results.push(number.value);
  });
  return results;
};

exports.astronomicValues = astronomicValues;

var constituentFactory = function constituentFactory(name, coefficients, u, f) {
  if (!coefficients) {
    throw new Error('Coefficient must be defined for a constituent');
  }

  var constituent = {
    name: name,
    coefficients: coefficients,
    value: function value(astro) {
      return dotArray(coefficients, astronomicValues(astro));
    },
    speed: function speed(astro) {
      return dotArray(coefficients, astronomicSpeed(astro));
    },
    u: typeof u !== 'undefined' ? u : _index["default"].uZero,
    f: typeof f !== 'undefined' ? f : _index["default"].fUnity
  };
  return Object.freeze(constituent);
};

var _default = constituentFactory;
exports["default"] = _default;
