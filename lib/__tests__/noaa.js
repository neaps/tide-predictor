"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create a directory for test cache
if (!_fs["default"].existsSync('./.test-cache')) {
  _fs["default"].mkdirSync('./.test-cache');
}

var stations = ['9413450', '9411340', '2695535', '8761724', '8410140'];

var getStation = function getStation(station, callback) {
  var filePath = "./.test-cache/".concat(station, ".json");

  if (_fs["default"].existsSync(filePath)) {
    _fs["default"].readFile(filePath, function (err, data) {
      if (err) {
        throw new Error('Cannot access test cache');
      }

      callback(JSON.parse(data));
    });

    return;
  }

  var stationData = {};
  (0, _nodeFetch["default"])("https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations/".concat(station, "/harcon.json?units=metric")).then(function (response) {
    return response.json();
  }).then(function (harmonics) {
    stationData.harmonics = harmonics;
    return (0, _nodeFetch["default"])("https://tidesandcurrents.noaa.gov/api/datagetter?date=recent&station=".concat(station, "&product=predictions&datum=MTL&time_zone=gmt&units=metric&format=json"));
  }).then(function (response) {
    return response.json();
  }).then(function (levels) {
    stationData.levels = levels;
    return (0, _nodeFetch["default"])("https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations/".concat(station, "/datums.json?units=metric"));
  }).then(function (response) {
    return response.json();
  }).then(function (info) {
    stationData.info = info;

    _fs["default"].writeFile(filePath, JSON.stringify(stationData), function (error) {
      if (error) {
        throw new Error('Cannot write to test cache');
      }

      callback(stationData);
    });
  });
};

describe('Results compare to NOAA', function () {
  stations.forEach(function (station) {
    test("it compares with station ".concat(station), function (done) {
      getStation(station, function (_ref) {
        var harmonics = _ref.harmonics,
            levels = _ref.levels,
            info = _ref.info;
        var mtl = 0;
        var mllw = 0;
        info.datums.forEach(function (datum) {
          if (datum.name === 'MTL') {
            mtl = datum.value;
          }

          if (datum.name === 'MLLW') {
            mllw = datum.value;
          }
        });
        var tideStation = (0, _["default"])(harmonics.HarmonicConstituents, mtl - mllw);
        levels.predictions.forEach(function (prediction) {
          var neapsPrediction = tideStation.getWaterLevelAtTime(new Date(prediction.t));
          expect(parseFloat(prediction.v)).toBeCloseTo(neapsPrediction.level, 1);
        });
        done();
      });
    });
  });
});
