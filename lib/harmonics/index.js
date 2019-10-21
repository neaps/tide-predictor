"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeline = exports.getDate = exports["default"] = void 0;

var _prediction = _interopRequireDefault(require("./prediction"));

var _index = _interopRequireDefault(require("../constituents/index"));

var _constants = require("../astronomy/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getDate = function getDate(time) {
  if (time instanceof Date) {
    return time;
  }

  if (typeof time === 'number') {
    return new Date(time * 1000);
  }

  throw new Error('Invalid date format, should be a Date object, or timestamp');
};

exports.getDate = getDate;

var getTimeline = function getTimeline(start, end, seconds) {
  seconds = typeof seconds !== 'undefined' ? seconds : 10 * 60;
  var timeline = [];
  var endTime = end.getTime() / 1000;
  var lastTime = start.getTime() / 1000;
  var startTime = lastTime;
  var hours = [];

  while (lastTime <= endTime) {
    timeline.push(new Date(lastTime * 1000));
    hours.push((lastTime - startTime) / (60 * 60));
    lastTime += seconds;
  }

  return {
    items: timeline,
    hours: hours
  };
};

exports.getTimeline = getTimeline;

var harmonicsFactory = function harmonicsFactory(_ref) {
  var harmonicConstituents = _ref.harmonicConstituents,
      phaseKey = _ref.phaseKey,
      offset = _ref.offset;

  if (!Array.isArray(harmonicConstituents)) {
    throw new Error('Harmonic constituents are not an array');
  }

  var constituents = [];
  harmonicConstituents.forEach(function (constituent, index) {
    if (typeof constituent.name === 'undefined') {
      throw new Error('Harmonic constituents must have a name property');
    }

    if (typeof _index["default"][constituent.name] !== 'undefined') {
      constituent._model = _index["default"][constituent.name];
      constituent._phase = _constants.d2r * constituent[phaseKey];
      constituents.push(constituent);
    }
  });

  if (offset !== false) {
    constituents.push({
      name: 'Z0',
      _model: _index["default"].Z0,
      _phase: 0,
      amplitude: offset
    });
  }

  var start = new Date();
  var end = new Date();
  var harmonics = {};

  harmonics.setTimeSpan = function (startTime, endTime) {
    start = getDate(startTime);
    end = getDate(endTime);

    if (start.getTime() >= end.getTime()) {
      throw new Error('Start time must be before end time');
    }

    return harmonics;
  };

  harmonics.prediction = function () {
    return (0, _prediction["default"])({
      timeline: getTimeline(start, end),
      constituents: constituents,
      start: start
    });
  };

  return Object.freeze(harmonics);
};

var _default = harmonicsFactory;
exports["default"] = _default;
