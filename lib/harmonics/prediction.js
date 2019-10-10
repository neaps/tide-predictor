"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../astronomy/index"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var modulus = function modulus(a, b) {
  return (a % b + b) % b;
};

var Prediction =
/*#__PURE__*/
function () {
  function Prediction(_ref) {
    var timeline = _ref.timeline,
        constituents = _ref.constituents,
        start = _ref.start;

    _classCallCheck(this, Prediction);

    this.timeline = timeline;
    this.constituents = constituents;
    this.start = start;
    this.setPhaseType('GMT');
  }

  _createClass(Prediction, [{
    key: "setPhaseType",
    value: function setPhaseType(phaseType) {
      if (['local', 'GMT'].indexOf(phaseType) === -1) {
        throw new Error('phase type must be local or GMT');
      }

      this.phaseType = phaseType;
    }
  }, {
    key: "setConstituentPhases",
    value: function setConstituentPhases() {
      var phaseKey = "phase_".concat(this.phaseType);
      this.constituents = this.constituents.map(function (constituent) {
        constituent._phase = typeof constituent._offsetPhase !== 'undefined' ? _constants.d2r * constituent._offsetPhase : _constants.d2r * constituent[phaseKey];
        return constituent;
      });
    }
  }, {
    key: "getExtremesPrediction",
    value: function getExtremesPrediction() {
      var _this = this;

      var results = [];

      var _this$prepare = this.prepare(),
          baseSpeed = _this$prepare.baseSpeed,
          u = _this$prepare.u,
          f = _this$prepare.f,
          baseValue = _this$prepare.baseValue;

      this.setConstituentPhases();
      var goingUp = false;
      var goingDown = false;
      var lastLevel = this.getLevel(0, baseSpeed, u[0], f[0], baseValue);
      this.timeline.items.forEach(function (time, index) {
        var hour = _this.timeline.hours[index];

        var level = _this.getLevel(hour, baseSpeed, u[index], f[index], baseValue); // Compare this level to the last one, if we
        // are changing angle, then the last one was high or low


        if (level > lastLevel && goingDown) {
          results.push({
            time: _this.timeline.items[index - 1],
            level: lastLevel,
            high: false,
            low: true,
            label: _this.getExtremeLabel('low')
          });
        }

        if (level < lastLevel && goingUp) {
          results.push({
            time: _this.timeline.items[index - 1],
            level: lastLevel,
            high: true,
            low: false,
            label: _this.getExtremeLabel('high')
          });
        }

        if (level > lastLevel) {
          goingUp = true;
          goingDown = false;
        }

        if (level < lastLevel) {
          goingUp = false;
          goingDown = true;
        }

        lastLevel = level;
      });
      return results;
    } // here for i18n

  }, {
    key: "getExtremeLabel",
    value: function getExtremeLabel(label) {
      var labels = {
        high: 'High',
        low: 'Low'
      };
      return labels[label];
    }
  }, {
    key: "getTimelinePrediction",
    value: function getTimelinePrediction() {
      var _this2 = this;

      var results = [];

      var _this$prepare2 = this.prepare(),
          baseSpeed = _this$prepare2.baseSpeed,
          u = _this$prepare2.u,
          f = _this$prepare2.f,
          baseValue = _this$prepare2.baseValue;

      this.setConstituentPhases();
      this.timeline.items.forEach(function (time, index) {
        var hour = _this2.timeline.hours[index];
        var prediction = {
          time: time,
          hour: hour,
          level: _this2.getLevel(hour, baseSpeed, u[index], f[index], baseValue)
        };
        results.push(prediction);
      });
      return results;
    }
  }, {
    key: "getLevel",
    value: function getLevel(hour, modelBaseSpeed, modelU, modelF, modelBaseValue) {
      var amplitudes = [];
      var result = 0;
      this.constituents.forEach(function (constituent) {
        var amplitude = constituent.amplitude;
        var phase = constituent._phase;
        var f = modelF[constituent.name];
        var speed = modelBaseSpeed[constituent.name];
        var u = modelU[constituent.name];
        var V0 = modelBaseValue[constituent.name];
        amplitudes.push(amplitude * f * Math.cos(speed * hour + (V0 + u) - phase));
      }); // sum up each row

      amplitudes.forEach(function (item) {
        result += item;
      });
      return result;
    }
  }, {
    key: "prepare",
    value: function prepare(radians) {
      var _this3 = this;

      radians = typeof radians !== 'undefined' ? radians : true;
      var baseAstro = (0, _index["default"])(this.start);
      var baseValue = {};
      var baseSpeed = {};
      var u = [];
      var f = [];
      this.constituents.forEach(function (constituent) {
        var value = constituent._model.value(baseAstro);

        var speed = constituent._model.speed(baseAstro);

        baseValue[constituent.name] = radians ? _constants.d2r * value : value;
        baseSpeed[constituent.name] = radians ? _constants.d2r * speed : speed;
      });
      this.timeline.items.forEach(function (time) {
        var uItem = {};
        var fItem = {};
        var itemAstro = (0, _index["default"])(time);

        _this3.constituents.forEach(function (constituent) {
          var constituentU = modulus(constituent._model.u(itemAstro), 360);
          uItem[constituent.name] = radians ? _constants.d2r * constituentU : constituentU;
          fItem[constituent.name] = modulus(constituent._model.f(itemAstro), 360);
        });

        u.push(uItem);
        f.push(fItem);
      });
      return {
        baseValue: baseValue,
        baseSpeed: baseSpeed,
        u: u,
        f: f
      };
    }
  }]);

  return Prediction;
}();

var _default = Prediction;
exports["default"] = _default;
