"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setConstituentPhases = exports["default"] = void 0;

var _index = _interopRequireDefault(require("../astronomy/index"));

var _constants = require("../astronomy/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var modulus = function modulus(a, b) {
  return (a % b + b) % b;
};

var setConstituentPhases = function setConstituentPhases(constituents, phaseKey) {
  return constituents.map(function (constituent) {
    constituent._phase = typeof constituent._offsetPhase !== 'undefined' ? _constants.d2r * constituent._offsetPhase : _constants.d2r * constituent[phaseKey];
    return constituent;
  });
};

exports.setConstituentPhases = setConstituentPhases;

var predictionFactory = function predictionFactory(_ref) {
  var timeline = _ref.timeline,
      constituents = _ref.constituents,
      start = _ref.start,
      phaseKey = _ref.phaseKey,
      extremeLabels = _ref.extremeLabels;
  phaseKey = typeof phaseKey !== 'undefined' ? phaseKey : 'phase_GMT';
  constituents = setConstituentPhases(constituents, phaseKey);

  var getExtremeLabel = function getExtremeLabel(label) {
    if (typeof extremeLabels !== 'undefined' && typeof extremeLabels[label] !== 'undefined') {
      return extremeLabels[label];
    }

    var labels = {
      high: 'High',
      low: 'Low'
    };
    return labels[label];
  };

  var getLevel = function getLevel(hour, modelBaseSpeed, modelU, modelF, modelBaseValue) {
    var amplitudes = [];
    var result = 0;
    constituents.forEach(function (constituent) {
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
  };

  var prediction = {};

  prediction.getExtremesPrediction = function () {
    var results = [];

    var _prepare = prepare(),
        baseSpeed = _prepare.baseSpeed,
        u = _prepare.u,
        f = _prepare.f,
        baseValue = _prepare.baseValue;

    var goingUp = false;
    var goingDown = false;
    var lastLevel = getLevel(0, baseSpeed, u[0], f[0], baseValue);
    timeline.items.forEach(function (time, index) {
      var hour = timeline.hours[index];
      var level = getLevel(hour, baseSpeed, u[index], f[index], baseValue); // Compare this level to the last one, if we
      // are changing angle, then the last one was high or low

      if (level > lastLevel && goingDown) {
        results.push({
          time: timeline.items[index - 1],
          level: lastLevel,
          high: false,
          low: true,
          label: getExtremeLabel('low')
        });
      }

      if (level < lastLevel && goingUp) {
        results.push({
          time: timeline.items[index - 1],
          level: lastLevel,
          high: true,
          low: false,
          label: getExtremeLabel('high')
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
  };

  prediction.getTimelinePrediction = function () {
    var results = [];

    var _prepare2 = prepare(),
        baseSpeed = _prepare2.baseSpeed,
        u = _prepare2.u,
        f = _prepare2.f,
        baseValue = _prepare2.baseValue;

    timeline.items.forEach(function (time, index) {
      var hour = timeline.hours[index];
      var prediction = {
        time: time,
        hour: hour,
        level: getLevel(hour, baseSpeed, u[index], f[index], baseValue)
      };
      results.push(prediction);
    });
    return results;
  };

  var prepare = function prepare(radians) {
    radians = typeof radians !== 'undefined' ? radians : true;
    var baseAstro = (0, _index["default"])(start);
    var baseValue = {};
    var baseSpeed = {};
    var u = [];
    var f = [];
    constituents.forEach(function (constituent) {
      var value = constituent._model.value(baseAstro);

      var speed = constituent._model.speed(baseAstro);

      baseValue[constituent.name] = radians ? _constants.d2r * value : value;
      baseSpeed[constituent.name] = radians ? _constants.d2r * speed : speed;
    });
    timeline.items.forEach(function (time) {
      var uItem = {};
      var fItem = {};
      var itemAstro = (0, _index["default"])(time);
      constituents.forEach(function (constituent) {
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
  };

  return Object.freeze(prediction);
};

var _default = predictionFactory;
exports["default"] = _default;
