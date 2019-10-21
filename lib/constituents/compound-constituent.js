"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var compoundConstituentFactory = function compoundConstituentFactory(name, members) {
  var coefficients = [];
  members.forEach(function (_ref) {
    var constituent = _ref.constituent,
        factor = _ref.factor;
    constituent.coefficients.forEach(function (coefficient, index) {
      if (typeof coefficients[index] === 'undefined') {
        coefficients[index] = 0;
      }

      coefficients[index] += coefficient * factor;
    });
  });
  var compoundConstituent = {
    name: name,
    coefficients: coefficients,
    speed: function speed(astro) {
      var speed = 0;
      members.forEach(function (_ref2) {
        var constituent = _ref2.constituent,
            factor = _ref2.factor;
        speed += constituent.speed(astro) * factor;
      });
      return speed;
    },
    value: function value(astro) {
      var value = 0;
      members.forEach(function (_ref3) {
        var constituent = _ref3.constituent,
            factor = _ref3.factor;
        value += constituent.value(astro) * factor;
      });
      return value;
    },
    u: function u(astro) {
      var u = 0;
      members.forEach(function (_ref4) {
        var constituent = _ref4.constituent,
            factor = _ref4.factor;
        u += constituent.u(astro) * factor;
      });
      return u;
    },
    f: function f(astro) {
      var f = [];
      members.forEach(function (_ref5) {
        var constituent = _ref5.constituent,
            factor = _ref5.factor;
        f.push(Math.pow(constituent.f(astro), Math.abs(factor)));
      });
      return f.reduce(function (previous, value) {
        return previous * value;
      });
    }
  };
  return Object.freeze(compoundConstituent);
};

var _default = compoundConstituentFactory;
exports["default"] = _default;
