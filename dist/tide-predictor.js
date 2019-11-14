(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.tidePredictor = factory());
}(this, function () { 'use strict';

  const d2r = Math.PI / 180.0;
  const r2d = 180.0 / Math.PI;

  // Convert a sexagesimal angle into decimal degrees
  const sexagesimalToDecimal = (degrees, arcmins, arcsecs, mas, muas) => {
    arcmins = typeof arcmins !== 'undefined' ? arcmins : 0;
    arcsecs = typeof arcsecs !== 'undefined' ? arcsecs : 0;
    mas = typeof mas !== 'undefined' ? mas : 0;
    muas = typeof muas !== 'undefined' ? muas : 0;

    return (
      degrees +
      arcmins / 60.0 +
      arcsecs / (60.0 * 60.0) +
      mas / (60.0 * 60.0 * 1e3) +
      muas / (60.0 * 60.0 * 1e6)
    )
  };

  const coefficients = {
    // Meeus formula 21.3
    terrestrialObliquity: [
      sexagesimalToDecimal(23, 26, 21.448),
      -sexagesimalToDecimal(0, 0, 4680.93),
      -sexagesimalToDecimal(0, 0, 1.55),
      sexagesimalToDecimal(0, 0, 1999.25),
      -sexagesimalToDecimal(0, 0, 51.38),
      -sexagesimalToDecimal(0, 0, 249.67),
      -sexagesimalToDecimal(0, 0, 39.05),
      sexagesimalToDecimal(0, 0, 7.12),
      sexagesimalToDecimal(0, 0, 27.87),
      sexagesimalToDecimal(0, 0, 5.79),
      sexagesimalToDecimal(0, 0, 2.45)
    ].map((number, index) => {
      return number * Math.pow(1e-2, index)
    }),

    solarPerigee: [
      280.46645 - 357.5291,
      36000.76932 - 35999.0503,
      0.0003032 + 0.0001559,
      0.00000048
    ],

    solarLongitude: [280.46645, 36000.76983, 0.0003032],

    lunarInclination: [5.145],

    lunarLongitude: [
      218.3164591,
      481267.88134236,
      -0.0013268,
      1 / 538841.0 - 1 / 65194000.0
    ],

    lunarNode: [
      125.044555,
      -1934.1361849,
      0.0020762,
      1 / 467410.0,
      -1 / 60616000.0
    ],

    lunarPerigee: [
      83.353243,
      4069.0137111,
      -0.0103238,
      -1 / 80053.0,
      1 / 18999000.0
    ]
  };

  // Evaluates a polynomial at argument
  const polynomial = (coefficients, argument) => {
    const result = [];
    coefficients.forEach((coefficient, index) => {
      result.push(coefficient * Math.pow(argument, index));
    });
    return result.reduce((a, b) => {
      return a + b
    })
  };

  // Evaluates a derivative polynomial at argument
  const derivativePolynomial = (coefficients, argument) => {
    const result = [];
    coefficients.forEach((coefficient, index) => {
      result.push(coefficient * index * Math.pow(argument, index - 1));
    });
    return result.reduce((a, b) => {
      return a + b
    })
  };

  // Meeus formula 11.1
  const T = t => {
    return (JD(t) - 2451545.0) / 36525
  };

  // Meeus formula 7.1
  const JD = t => {
    let Y = t.getFullYear();
    let M = t.getMonth() + 1;
    const D =
      t.getDate() +
      t.getHours() / 24.0 +
      t.getMinutes() / (24.0 * 60.0) +
      t.getSeconds() / (24.0 * 60.0 * 60.0) +
      t.getMilliseconds() / (24.0 * 60.0 * 60.0 * 1e6);
    if (M <= 2) {
      Y = Y - 1;
      M = M + 12;
    }
    const A = Math.floor(Y / 100.0);
    const B = 2 - A + Math.floor(A / 4.0);
    return (
      Math.floor(365.25 * (Y + 4716)) +
      Math.floor(30.6001 * (M + 1)) +
      D +
      B -
      1524.5
    )
  };

  /**
   * @todo - What's  with the array returned from the arccos?
   * @param {*} N
   * @param {*} i
   * @param {*} omega
   */
  const _I = (N, i, omega) => {
    N = d2r * N;
    i = d2r * i;
    omega = d2r * omega;
    const cosI =
      Math.cos(i) * Math.cos(omega) - Math.sin(i) * Math.sin(omega) * Math.cos(N);
    return r2d * Math.acos(cosI)
  };

  const _xi = (N, i, omega) => {
    N = d2r * N;
    i = d2r * i;
    omega = d2r * omega;
    let e1 =
      (Math.cos(0.5 * (omega - i)) / Math.cos(0.5 * (omega + i))) *
      Math.tan(0.5 * N);
    let e2 =
      (Math.sin(0.5 * (omega - i)) / Math.sin(0.5 * (omega + i))) *
      Math.tan(0.5 * N);
    e1 = Math.atan(e1);
    e2 = Math.atan(e2);
    e1 = e1 - 0.5 * N;
    e2 = e2 - 0.5 * N;
    return -(e1 + e2) * r2d
  };

  const _nu = (N, i, omega) => {
    N = d2r * N;
    i = d2r * i;
    omega = d2r * omega;
    let e1 =
      (Math.cos(0.5 * (omega - i)) / Math.cos(0.5 * (omega + i))) *
      Math.tan(0.5 * N);
    let e2 =
      (Math.sin(0.5 * (omega - i)) / Math.sin(0.5 * (omega + i))) *
      Math.tan(0.5 * N);
    e1 = Math.atan(e1);
    e2 = Math.atan(e2);
    e1 = e1 - 0.5 * N;
    e2 = e2 - 0.5 * N;
    return (e1 - e2) * r2d
  };

  // Schureman equation 224
  const _nup = (N, i, omega) => {
    const I = d2r * _I(N, i, omega);
    const nu = d2r * _nu(N, i, omega);
    return (
      r2d *
      Math.atan(
        (Math.sin(2 * I) * Math.sin(nu)) /
          (Math.sin(2 * I) * Math.cos(nu) + 0.3347)
      )
    )
  };

  // Schureman equation 232
  const _nupp = (N, i, omega) => {
    const I = d2r * _I(N, i, omega);
    const nu = d2r * _nu(N, i, omega);
    const tan2nupp =
      (Math.sin(I) ** 2 * Math.sin(2 * nu)) /
      (Math.sin(I) ** 2 * Math.cos(2 * nu) + 0.0727);
    return r2d * 0.5 * Math.atan(tan2nupp)
  };

  const modulus = (a, b) => {
    return ((a % b) + b) % b
  };

  const astro = time => {
    const result = {};
    const polynomials = {
      s: coefficients.lunarLongitude,
      h: coefficients.solarLongitude,
      p: coefficients.lunarPerigee,
      N: coefficients.lunarNode,
      pp: coefficients.solarPerigee,
      90: [90.0],
      omega: coefficients.terrestrialObliquity,
      i: coefficients.lunarInclination
    };

    // Polynomials are in T, that is Julian Centuries; we want our speeds to be
    // in the more convenient unit of degrees per hour.
    const dTdHour = 1 / (24 * 365.25 * 100);
    Object.keys(polynomials).forEach(name => {
      result[name] = {
        value: modulus(polynomial(polynomials[name], T(time)), 360.0),
        speed: derivativePolynomial(polynomials[name], T(time)) * dTdHour
      };
    });

    // Some other parameters defined by Schureman which are dependent on the
    // parameters N, i, omega for use in node factor calculations. We don't need
    // their speeds.
    const functions = {
      I: _I,
      xi: _xi,
      nu: _nu,
      nup: _nup,
      nupp: _nupp
    };
    Object.keys(functions).forEach(name => {
      const functionCall = functions[name];
      result[name] = {
        value: modulus(
          functionCall(result.N.value, result.i.value, result.omega.value),
          360.0
        ),
        speed: null
      };
    });

    // We don't work directly with the T (hours) parameter, instead our spanning
    // set for equilibrium arguments #is given by T+h-s, s, h, p, N, pp, 90.
    // This is in line with convention.
    const hour = {
      value: (JD(time) - Math.floor(JD(time))) * 360.0,
      speed: 15.0
    };

    result['T+h-s'] = {
      value: hour.value + result.h.value - result.s.value,
      speed: hour.speed + result.h.speed - result.s.speed
    };

    // It is convenient to calculate Schureman's P here since several node
    // factors need it, although it could be argued that these
    // (along with I, xi, nu etc) belong somewhere else.
    result.P = {
      value: result.p.value - (result.xi.value % 360.0),
      speed: null
    };

    return result
  };

  const modulus$1 = (a, b) => {
    return ((a % b) + b) % b
  };

  const addExtremesOffsets = (extreme, offsets) => {
    if (typeof offsets === 'undefined' || !offsets) {
      return extreme
    }
    if (extreme.high && offsets.height_offset && offsets.height_offset.high) {
      extreme.level *= offsets.height_offset.high;
    }
    if (extreme.low && offsets.height_offset && offsets.height_offset.low) {
      extreme.level *= offsets.height_offset.low;
    }
    if (extreme.high && offsets.time_offset && offsets.time_offset.high) {
      extreme.time = new Date(
        extreme.time.getTime() + offsets.time_offset.high * 60 * 1000
      );
    }
    if (extreme.low && offsets.time_offset && offsets.time_offset.low) {
      extreme.time = new Date(
        extreme.time.getTime() + offsets.time_offset.low * 60 * 1000
      );
    }
    return extreme
  };

  const getExtremeLabel = (label, highLowLabels) => {
    if (
      typeof highLowLabels !== 'undefined' &&
      typeof highLowLabels[label] !== 'undefined'
    ) {
      return highLowLabels[label]
    }
    const labels = {
      high: 'High',
      low: 'Low'
    };
    return labels[label]
  };

  const predictionFactory = ({ timeline, constituents, start }) => {
    const getLevel = (hour, modelBaseSpeed, modelU, modelF, modelBaseValue) => {
      const amplitudes = [];
      let result = 0;

      constituents.forEach(constituent => {
        const amplitude = constituent.amplitude;
        const phase = constituent._phase;
        const f = modelF[constituent.name];
        const speed = modelBaseSpeed[constituent.name];
        const u = modelU[constituent.name];
        const V0 = modelBaseValue[constituent.name];
        amplitudes.push(amplitude * f * Math.cos(speed * hour + (V0 + u) - phase));
      });
      // sum up each row
      amplitudes.forEach(item => {
        result += item;
      });
      return result
    };

    const prediction = {};

    prediction.getExtremesPrediction = options => {
      const { labels, offsets } = typeof options !== 'undefined' ? options : {};
      const results = [];
      const { baseSpeed, u, f, baseValue } = prepare();
      let goingUp = false;
      let goingDown = false;
      let lastLevel = getLevel(0, baseSpeed, u[0], f[0], baseValue);
      timeline.items.forEach((time, index) => {
        const hour = timeline.hours[index];
        const level = getLevel(hour, baseSpeed, u[index], f[index], baseValue);
        // Compare this level to the last one, if we
        // are changing angle, then the last one was high or low
        if (level > lastLevel && goingDown) {
          results.push(
            addExtremesOffsets(
              {
                time: timeline.items[index - 1],
                level: lastLevel,
                high: false,
                low: true,
                label: getExtremeLabel('low', labels)
              },
              offsets
            )
          );
        }
        if (level < lastLevel && goingUp) {
          results.push(
            addExtremesOffsets(
              {
                time: timeline.items[index - 1],
                level: lastLevel,
                high: true,
                low: false,
                label: getExtremeLabel('high', labels)
              },
              offsets
            )
          );
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
      return results
    };

    prediction.getTimelinePrediction = () => {
      const results = [];
      const { baseSpeed, u, f, baseValue } = prepare();
      timeline.items.forEach((time, index) => {
        const hour = timeline.hours[index];
        const prediction = {
          time: time,
          hour: hour,
          level: getLevel(hour, baseSpeed, u[index], f[index], baseValue)
        };

        results.push(prediction);
      });
      return results
    };

    const prepare = () => {
      const baseAstro = astro(start);

      const baseValue = {};
      const baseSpeed = {};
      const u = [];
      const f = [];
      constituents.forEach(constituent => {
        const value = constituent._model.value(baseAstro);
        const speed = constituent._model.speed(baseAstro);
        baseValue[constituent.name] = d2r * value;
        baseSpeed[constituent.name] = d2r * speed;
      });
      timeline.items.forEach(time => {
        const uItem = {};
        const fItem = {};
        const itemAstro = astro(time);
        constituents.forEach(constituent => {
          const constituentU = modulus$1(constituent._model.u(itemAstro), 360);

          uItem[constituent.name] = d2r * constituentU;
          fItem[constituent.name] = modulus$1(constituent._model.f(itemAstro), 360);
        });
        u.push(uItem);
        f.push(fItem);
      });

      return {
        baseValue: baseValue,
        baseSpeed: baseSpeed,
        u: u,
        f: f
      }
    };

    return Object.freeze(prediction)
  };

  const corrections = {
    fUnity() {
      return 1
    },

    // Schureman equations 73, 65
    fMm(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const mean =
        (2 / 3.0 - Math.pow(Math.sin(omega), 2)) *
        (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2));
      return (2 / 3.0 - Math.pow(Math.sin(I), 2)) / mean
    },

    // Schureman equations 74, 66
    fMf(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const mean = Math.pow(Math.sin(omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
      return Math.pow(Math.sin(I), 2) / mean
    },

    // Schureman equations 75, 67
    fO1(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const mean =
        Math.sin(omega) *
        Math.pow(Math.cos(0.5 * omega), 2) *
        Math.pow(Math.cos(0.5 * i), 4);
      return (Math.sin(I) * Math.pow(Math.cos(0.5 * I), 2)) / mean
    },

    // Schureman equations 76, 68
    fJ1(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const mean =
        Math.sin(2 * omega) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2));
      return Math.sin(2 * I) / mean
    },

    // Schureman equations 77, 69
    fOO1(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const mean =
        Math.sin(omega) *
        Math.pow(Math.sin(0.5 * omega), 2) *
        Math.pow(Math.cos(0.5 * i), 4);
      return (Math.sin(I) * Math.pow(Math.sin(0.5 * I), 2)) / mean
    },

    // Schureman equations 78, 70
    fM2(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const mean =
        Math.pow(Math.cos(0.5 * omega), 4) * Math.pow(Math.cos(0.5 * i), 4);
      return Math.pow(Math.cos(0.5 * I), 4) / mean
    },

    // Schureman equations 227, 226, 68
    // Should probably eventually include the derivations of the magic numbers (0.5023 etc).
    fK1(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const nu = d2r * a.nu.value;
      const sin2IcosnuMean =
        Math.sin(2 * omega) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2));
      const mean = 0.5023 * sin2IcosnuMean + 0.1681;
      return (
        Math.pow(
          0.2523 * Math.pow(Math.sin(2 * I), 2) +
            0.1689 * Math.sin(2 * I) * Math.cos(nu) +
            0.0283,
          0.5
        ) / mean
      )
    },

    // Schureman equations 215, 213, 204
    // It can be (and has been) confirmed that the exponent for R_a reads 1/2 via Schureman Table 7
    fL2(a) {
      const P = d2r * a.P.value;
      const I = d2r * a.I.value;
      const rAInv = Math.pow(
        1 -
          12 * Math.pow(Math.tan(0.5 * I), 2) * Math.cos(2 * P) +
          36 * Math.pow(Math.tan(0.5 * I), 4),
        0.5
      );
      return corrections.fM2(a) * rAInv
    },

    // Schureman equations 235, 234, 71
    // Again, magic numbers
    fK2(a) {
      const omega = d2r * a.omega.value;
      const i = d2r * a.i.value;
      const I = d2r * a.I.value;
      const nu = d2r * a.nu.value;
      const sinsqIcos2nuMean =
        Math.sin(omega) ** 2 * (1 - (3 / 2.0) * Math.sin(i) ** 2);
      const mean = 0.5023 * sinsqIcos2nuMean + 0.0365;
      return (
        Math.pow(
          0.2523 * Math.pow(Math.sin(I), 4) +
            0.0367 * Math.pow(Math.sin(I), 2) * Math.cos(2 * nu) +
            0.0013,
          0.5
        ) / mean
      )
    },
    // Schureman equations 206, 207, 195
    fM1(a) {
      const P = d2r * a.P.value;
      const I = d2r * a.I.value;
      const qAInv = Math.pow(
        0.25 +
          1.5 *
            Math.cos(I) *
            Math.cos(2 * P) *
            Math.pow(Math.cos(0.5 * I), -0.5) +
          2.25 * Math.pow(Math.cos(I), 2) * Math.pow(Math.cos(0.5 * I), -4),
        0.5
      );
      return corrections.fO1(a) * qAInv
    },

    // See e.g. Schureman equation 149
    fModd(a, n) {
      return Math.pow(corrections.fM2(a), n / 2.0)
    },

    // Node factors u, see Table 2 of Schureman.

    uZero(a) {
      return 0.0
    },

    uMf(a) {
      return -2.0 * a.xi.value
    },

    uO1(a) {
      return 2.0 * a.xi.value - a.nu.value
    },

    uJ1(a) {
      return -a.nu.value
    },

    uOO1(a) {
      return -2.0 * a.xi.value - a.nu.value
    },

    uM2(a) {
      return 2.0 * a.xi.value - 2.0 * a.nu.value
    },

    uK1(a) {
      return -a.nup.value
    },

    // Schureman 214
    uL2(a) {
      const I = d2r * a.I.value;
      const P = d2r * a.P.value;
      const R =
        r2d *
        Math.atan(
          Math.sin(2 * P) /
            ((1 / 6.0) * Math.pow(Math.tan(0.5 * I), -2) - Math.cos(2 * P))
        );
      return 2.0 * a.xi.value - 2.0 * a.nu.value - R
    },

    uK2(a) {
      return -2.0 * a.nupp.value
    },

    // Schureman 202
    uM1(a) {
      const I = d2r * a.I.value;
      const P = d2r * a.P.value;
      const Q =
        r2d *
        Math.atan(((5 * Math.cos(I) - 1) / (7 * Math.cos(I) + 1)) * Math.tan(P));
      return a.xi.value - a.nu.value + Q
    },

    uModd(a, n) {
      return (n / 2.0) * corrections.uM2(a)
    }
  };

  /**
   * Computes the dot notation of two arrays
   * @param {*} a
   * @param {*} b
   */
  const dotArray = (a, b) => {
    const results = [];
    a.forEach((value, index) => {
      results.push(value * b[index]);
    });
    return results.reduce((total, value) => {
      return total + value
    })
  };

  const astronimicDoodsonNumber = astro => {
    return [
      astro['T+h-s'],
      astro.s,
      astro.h,
      astro.p,
      astro.N,
      astro.pp,
      astro['90']
    ]
  };

  const astronomicSpeed = astro => {
    const results = [];
    astronimicDoodsonNumber(astro).forEach(number => {
      results.push(number.speed);
    });
    return results
  };

  const astronomicValues = astro => {
    const results = [];
    astronimicDoodsonNumber(astro).forEach(number => {
      results.push(number.value);
    });
    return results
  };

  const constituentFactory = (name, coefficients, u, f) => {
    if (!coefficients) {
      throw new Error('Coefficient must be defined for a constituent')
    }

    const constituent = {
      name: name,

      coefficients: coefficients,

      value: astro => {
        return dotArray(coefficients, astronomicValues(astro))
      },

      speed(astro) {
        return dotArray(coefficients, astronomicSpeed(astro))
      },

      u: typeof u !== 'undefined' ? u : corrections.uZero,

      f: typeof f !== 'undefined' ? f : corrections.fUnity
    };

    return Object.freeze(constituent)
  };

  const compoundConstituentFactory = (name, members) => {
    const coefficients = [];
    members.forEach(({ constituent, factor }) => {
      constituent.coefficients.forEach((coefficient, index) => {
        if (typeof coefficients[index] === 'undefined') {
          coefficients[index] = 0;
        }
        coefficients[index] += coefficient * factor;
      });
    });

    const compoundConstituent = {
      name: name,

      coefficients: coefficients,

      speed: astro => {
        let speed = 0;
        members.forEach(({ constituent, factor }) => {
          speed += constituent.speed(astro) * factor;
        });
        return speed
      },

      value: astro => {
        let value = 0;
        members.forEach(({ constituent, factor }) => {
          value += constituent.value(astro) * factor;
        });
        return value
      },

      u: astro => {
        let u = 0;
        members.forEach(({ constituent, factor }) => {
          u += constituent.u(astro) * factor;
        });
        return u
      },

      f: astro => {
        const f = [];
        members.forEach(({ constituent, factor }) => {
          f.push(Math.pow(constituent.f(astro), Math.abs(factor)));
        });
        return f.reduce((previous, value) => {
          return previous * value
        })
      }
    };

    return Object.freeze(compoundConstituent)
  };

  const constituents = {};
  // Long Term
  constituents.Z0 = constituentFactory('Z0', [0, 0, 0, 0, 0, 0, 0], corrections.uZero, corrections.fUnity);
  constituents.SA = constituentFactory('Sa', [0, 0, 1, 0, 0, 0, 0], corrections.uZero, corrections.fUnity);
  constituents.SSA = constituentFactory(
    'Ssa',
    [0, 0, 2, 0, 0, 0, 0],
    corrections.uZero,
    corrections.fUnity
  );
  constituents.MM = constituentFactory('MM', [0, 1, 0, -1, 0, 0, 0], corrections.uZero, corrections.fMm);
  constituents.MF = constituentFactory('MF', [0, 2, 0, 0, 0, 0, 0], corrections.uMf, corrections.fMf);
  // Diurnals
  constituents.Q1 = constituentFactory('Q1', [1, -2, 0, 1, 0, 0, 1], corrections.uO1, corrections.fO1);
  constituents.O1 = constituentFactory('O1', [1, -1, 0, 0, 0, 0, 1], corrections.uO1, corrections.fO1);
  constituents.K1 = constituentFactory('K1', [1, 1, 0, 0, 0, 0, -1], corrections.uK1, corrections.fK1);
  constituents.J1 = constituentFactory('J1', [1, 2, 0, -1, 0, 0, -1], corrections.uJ1, corrections.fJ1);
  constituents.M1 = constituentFactory('M1', [1, 0, 0, 0, 0, 0, 1], corrections.uM1, corrections.fM1);
  constituents.P1 = constituentFactory('P1', [1, 1, -2, 0, 0, 0, 1], corrections.uZero, corrections.fUnity);
  constituents.S1 = constituentFactory('S1', [1, 1, -1, 0, 0, 0, 0], corrections.uZero, corrections.fUnity);
  constituents.OO1 = constituentFactory('OO1', [1, 3, 0, 0, 0, 0, -1], corrections.uOO1, corrections.fOO1);
  // Semi diurnals
  constituents['2N2'] = constituentFactory('2N2', [2, -2, 0, 2, 0, 0, 0], corrections.uM2, corrections.fM2);
  constituents.N2 = constituentFactory('N2', [2, -1, 0, 1, 0, 0, 0], corrections.uM2, corrections.fM2);
  constituents.NU2 = constituentFactory('NU2', [2, -1, 2, -1, 0, 0, 0], corrections.uM2, corrections.fM2);
  constituents.M2 = constituentFactory('M2', [2, 0, 0, 0, 0, 0, 0], corrections.uM2, corrections.fM2);
  constituents.LAM2 = constituentFactory('LAM2', [2, 1, -2, 1, 0, 0, 2], corrections.uM2, corrections.fM2);
  constituents.L2 = constituentFactory('L2', [2, 1, 0, -1, 0, 0, 2], corrections.uL2, corrections.fL2);
  constituents.T2 = constituentFactory('T2', [2, 2, -3, 0, 0, 1, 0], corrections.uZero, corrections.fUnity);
  constituents.S2 = constituentFactory('S2', [2, 2, -2, 0, 0, 0, 0], corrections.uZero, corrections.fUnity);
  constituents.R2 = constituentFactory(
    'R2',
    [2, 2, -1, 0, 0, -1, 2],
    corrections.uZero,
    corrections.fUnity
  );
  constituents.K2 = constituentFactory('K2', [2, 2, 0, 0, 0, 0, 0], corrections.uK2, corrections.fK2);
  // Third diurnal
  constituents.M3 = constituentFactory(
    'M3',
    [3, 0, 0, 0, 0, 0, 0],
    a => {
      return corrections.uModd(a, 3)
    },
    a => {
      return corrections.fModd(a, 3)
    }
  );
  // Compound
  constituents.MSF = compoundConstituentFactory('MSF', [
    { constituent: constituents.S2, factor: 1 },
    { constituent: constituents.M2, factor: -1 }
  ]);

  // Diurnal
  constituents['2Q1'] = compoundConstituentFactory('2Q1', [
    { constituent: constituents.N2, factor: 1 },
    { constituent: constituents.J1, factor: -1 }
  ]);
  constituents.RHO = compoundConstituentFactory('RHO', [
    { constituent: constituents.NU2, factor: 1 },
    { constituent: constituents.K1, factor: -1 }
  ]);

  // Semi-Diurnal

  constituents.MU2 = compoundConstituentFactory('MU2', [
    { constituent: constituents.M2, factor: 2 },
    { constituent: constituents.S2, factor: -1 }
  ]);
  constituents['2SM2'] = compoundConstituentFactory('2SM2', [
    { constituent: constituents.S2, factor: 2 },
    { constituent: constituents.M2, factor: -1 }
  ]);

  // Third-Diurnal
  constituents['2MK3'] = compoundConstituentFactory('2MK3', [
    { constituent: constituents.M2, factor: 1 },
    { constituent: constituents.O1, factor: 1 }
  ]);
  constituents.MK3 = compoundConstituentFactory('MK3', [
    { constituent: constituents.M2, factor: 1 },
    { constituent: constituents.K1, factor: 1 }
  ]);

  // Quarter-Diurnal
  constituents.MN4 = compoundConstituentFactory('MN4', [
    { constituent: constituents.M2, factor: 1 },
    { constituent: constituents.N2, factor: 1 }
  ]);
  constituents.M4 = compoundConstituentFactory('M4', [
    { constituent: constituents.M2, factor: 2 }
  ]);
  constituents.MS4 = compoundConstituentFactory('MS4', [
    { constituent: constituents.M2, factor: 1 },
    { constituent: constituents.S2, factor: 1 }
  ]);
  constituents.S4 = compoundConstituentFactory('S4', [
    { constituent: constituents.S2, factor: 2 }
  ]);

  // Sixth-Diurnal
  constituents.M6 = compoundConstituentFactory('M6', [
    { constituent: constituents.M2, factor: 3 }
  ]);
  constituents.S6 = compoundConstituentFactory('S6', [
    { constituent: constituents.S2, factor: 3 }
  ]);

  // Eighth-Diurnals
  constituents.M8 = compoundConstituentFactory('M8', [
    { constituent: constituents.M2, factor: 4 }
  ]);

  const getDate = time => {
    if (time instanceof Date) {
      return time
    }
    if (typeof time === 'number') {
      return new Date(time * 1000)
    }
    throw new Error('Invalid date format, should be a Date object, or timestamp')
  };

  const getTimeline = (start, end, seconds) => {
    seconds = typeof seconds !== 'undefined' ? seconds : 10 * 60;
    const timeline = [];
    const endTime = end.getTime() / 1000;
    let lastTime = start.getTime() / 1000;
    const startTime = lastTime;
    const hours = [];
    while (lastTime <= endTime) {
      timeline.push(new Date(lastTime * 1000));
      hours.push((lastTime - startTime) / (60 * 60));
      lastTime += seconds;
    }

    return {
      items: timeline,
      hours: hours
    }
  };

  const harmonicsFactory = ({ harmonicConstituents, phaseKey, offset }) => {
    if (!Array.isArray(harmonicConstituents)) {
      throw new Error('Harmonic constituents are not an array')
    }
    const constituents$1 = [];
    harmonicConstituents.forEach((constituent, index) => {
      if (typeof constituent.name === 'undefined') {
        throw new Error('Harmonic constituents must have a name property')
      }
      if (typeof constituents[constituent.name] !== 'undefined') {
        constituent._model = constituents[constituent.name];
        constituent._phase = d2r * constituent[phaseKey];
        constituents$1.push(constituent);
      }
    });

    if (offset !== false) {
      constituents$1.push({
        name: 'Z0',
        _model: constituents.Z0,
        _phase: 0,
        amplitude: offset
      });
    }

    let start = new Date();
    let end = new Date();

    const harmonics = {};

    harmonics.setTimeSpan = (startTime, endTime) => {
      start = getDate(startTime);
      end = getDate(endTime);
      if (start.getTime() >= end.getTime()) {
        throw new Error('Start time must be before end time')
      }
      return harmonics
    };

    harmonics.prediction = options => {
      options =
        typeof options !== 'undefined' ? options : { timeFidelity: 10 * 60 };
      return predictionFactory({
        timeline: getTimeline(start, end, options.timeFidelity),
        constituents: constituents$1,
        start: start
      })
    };

    return Object.freeze(harmonics)
  };

  const tidePredictionFactory = (constituents, options) => {
    const harmonicsOptions = {
      harmonicConstituents: constituents,
      phaseKey: 'phase_GMT',
      offset: false
    };

    if (typeof options !== 'undefined') {
      Object.keys(harmonicsOptions).forEach(key => {
        if (typeof options[key] !== 'undefined') {
          harmonicsOptions[key] = options[key];
        }
      });
    }

    const tidePrediction = {
      getTimelinePrediction: ({ start, end }) => {
        return harmonicsFactory(harmonicsOptions)
          .setTimeSpan(start, end)
          .prediction()
          .getTimelinePrediction()
      },

      getExtremesPrediction: ({ start, end, labels, offsets, timeFidelity }) => {
        return harmonicsFactory(harmonicsOptions)
          .setTimeSpan(start, end)
          .prediction({ timeFidelity: timeFidelity })
          .getExtremesPrediction(labels, offsets)
      },

      getWaterLevelAtTime: ({ time }) => {
        const endDate = new Date(time.getTime() + 10 * 60 * 1000);
        return harmonicsFactory(harmonicsOptions)
          .setTimeSpan(time, endDate)
          .prediction()
          .getTimelinePrediction()[0]
      }
    };

    return tidePrediction
  };

  return tidePredictionFactory;

}));
