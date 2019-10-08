"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortedDoodson = exports.extendedDoodson = exports["default"] = void 0;

var _nodeCorrections = _interopRequireDefault(require("../node-corrections"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var extendedDoodson = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: -8,
  S: -7,
  T: -6,
  U: -5,
  V: -4,
  W: -3,
  X: -2,
  Y: -1,
  Z: 0
};
/**
 * Computes the dot notation of two arrays
 * @param {*} a
 * @param {*} b
 */

exports.extendedDoodson = extendedDoodson;

var dotArray = function dotArray(a, b) {
  var results = [];
  a.forEach(function (value, index) {
    results.push(value * b[index]);
  });
  return results.reduce(function (total, value) {
    return total + value;
  });
};

var sortedDoodson = {};
exports.sortedDoodson = sortedDoodson;
Object.keys(extendedDoodson).forEach(function (key) {
  sortedDoodson[extendedDoodson[key]] = key;
});

var constituent =
/*#__PURE__*/
function () {
  function constituent(name, doodsonNumber, coefficients, u, f) {
    _classCallCheck(this, constituent);

    this.name = name;

    if (!doodsonNumber && !coefficients) {
      throw 'doodson or coefficient must be defined for a constituent';
    }

    if (!doodsonNumber && coefficients) {
      this.coefficients = coefficients;
    } else {
      this.coefficients = this.doodsonNumberToCooeficient(doodsonNumber);
    }

    this.u = typeof u !== 'undefined' ? u : _nodeCorrections["default"].u_zero;
    this.f = typeof f !== 'undefined' ? f : _nodeCorrections["default"].f_unity;
  }

  _createClass(constituent, [{
    key: "doodsonNumberToCooeficient",
    value: function doodsonNumberToCooeficient(doodsonNumber) {
      var coefficeint = [];
      doodsonNumber.split('').forEach(function (letter) {
        if (letter.search(/\w/) === -1) {
          return;
        }

        coefficeint.push(extendedDoodson[letter.toUpperCase()]);
      });
      return coefficeint;
    }
  }, {
    key: "cooeficientToDoodsonNumber",
    value: function cooeficientToDoodsonNumber(coefficients) {
      coefficients = typeof coefficients !== 'undefined' ? coefficients : this.coefficients;
      var doodsonNumber = [];
      coefficients.forEach(function (coefficient) {
        doodsonNumber.push(sortedDoodson[coefficient]);
      });
      return doodsonNumber.join('');
    }
  }, {
    key: "value",
    value: function value(astro) {
      return dotArray(this.coefficients, this.astronomicValues(astro));
    }
  }, {
    key: "speed",
    value: function speed(astro) {
      return dotArray(this.coefficients, this.astronomicSpeed(astro));
    }
  }, {
    key: "astronimicDoodsonNumber",
    value: function astronimicDoodsonNumber(astro) {
      return [astro['T+h-s'], astro['s'], astro['h'], astro['p'], astro['N'], astro['pp'], astro['90']];
    }
  }, {
    key: "astronomicSpeed",
    value: function astronomicSpeed(astro) {
      var results = [];
      this.astronimicDoodsonNumber(astro).forEach(function (number) {
        results.push(number.speed);
      });
      return results;
    }
  }, {
    key: "astronomicValues",
    value: function astronomicValues(astro) {
      var results = [];
      this.astronimicDoodsonNumber(astro).forEach(function (number) {
        results.push(number.value);
      });
      return results;
    } //Consider two out of phase constituents which travel at the same speed to
    // be identical

  }, {
    key: "isEqual",
    value: function isEqual(constituent) {
      return this.cooeficientToDoodsonNumber() === constituent.cooeficientToDoodsonNumber();
    }
  }, {
    key: "hash",
    value: function hash() {
      var hash = [];
      this.coefficients.forEach(function (coefficient) {
        if (coefficient < 0) {
          hash.push("m".concat(coefficient * -1));
        } else {
          hash.push(coefficient);
        }
      });
      return hash.join('');
    }
  }]);

  return constituent;
}();

var _default = constituent;
exports["default"] = _default;
