"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constituent = _interopRequireDefault(require("./constituent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var compoundConstituent =
/*#__PURE__*/
function () {
  function compoundConstituent(name, members) {
    _classCallCheck(this, compoundConstituent);

    this.name = name;
    this.members = members;
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
    this.coefficients = coefficients;
  }

  _createClass(compoundConstituent, [{
    key: "speed",
    value: function speed(astro) {
      var speed = 0;
      this.members.forEach(function (_ref2) {
        var constituent = _ref2.constituent,
            factor = _ref2.factor;
        speed += constituent.speed(astro) * factor;
      });
      return speed;
    }
  }, {
    key: "value",
    value: function value(astro) {
      var value = 0;
      this.members.forEach(function (_ref3) {
        var constituent = _ref3.constituent,
            factor = _ref3.factor;
        value += constituent.value(astro) * factor;
      });
      return value;
    }
  }, {
    key: "u",
    value: function u(astro) {
      var u = 0;
      this.members.forEach(function (_ref4) {
        var constituent = _ref4.constituent,
            factor = _ref4.factor;
        u += constituent.u(astro) * factor;
      });
      return u;
    }
  }, {
    key: "f",
    value: function f(astro) {
      var f = [];
      this.members.forEach(function (_ref5) {
        var constituent = _ref5.constituent,
            factor = _ref5.factor;
        f.push(Math.pow(constituent.f(astro), Math.abs(factor)));
      });
      return f.reduce(function (previous, value) {
        return previous * value;
      });
    }
  }]);

  return compoundConstituent;
}();

var _default = compoundConstituent;
exports["default"] = _default;
