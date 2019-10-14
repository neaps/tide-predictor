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

var coefficients = {
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

class Prediction {
  constructor({ timeline, constituents, start }) {
    this.timeline = timeline;
    this.constituents = constituents;
    this.start = start;
    this.setPhaseType('GMT');
  }

  setPhaseType(phaseType) {
    if (['local', 'GMT'].indexOf(phaseType) === -1) {
      throw new Error('phase type must be local or GMT')
    }
    this.phaseType = phaseType;
  }

  setConstituentPhases() {
    const phaseKey = `phase_${this.phaseType}`;
    this.constituents = this.constituents.map(constituent => {
      constituent._phase =
        typeof constituent._offsetPhase !== 'undefined'
          ? d2r * constituent._offsetPhase
          : d2r * constituent[phaseKey];
      return constituent
    });
  }

  getExtremesPrediction() {
    const results = [];
    const { baseSpeed, u, f, baseValue } = this.prepare();
    this.setConstituentPhases();
    let goingUp = false;
    let goingDown = false;
    let lastLevel = this.getLevel(0, baseSpeed, u[0], f[0], baseValue);
    this.timeline.items.forEach((time, index) => {
      const hour = this.timeline.hours[index];
      const level = this.getLevel(
        hour,
        baseSpeed,
        u[index],
        f[index],
        baseValue
      );
      // Compare this level to the last one, if we
      // are changing angle, then the last one was high or low
      if (level > lastLevel && goingDown) {
        results.push({
          time: this.timeline.items[index - 1],
          level: lastLevel,
          high: false,
          low: true,
          label: this.getExtremeLabel('low')
        });
      }
      if (level < lastLevel && goingUp) {
        results.push({
          time: this.timeline.items[index - 1],
          level: lastLevel,
          high: true,
          low: false,
          label: this.getExtremeLabel('high')
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
    return results
  }

  // here for i18n
  getExtremeLabel(label) {
    const labels = {
      high: 'High',
      low: 'Low'
    };
    return labels[label]
  }

  getTimelinePrediction() {
    const results = [];
    const { baseSpeed, u, f, baseValue } = this.prepare();
    this.setConstituentPhases();
    this.timeline.items.forEach((time, index) => {
      const hour = this.timeline.hours[index];
      const prediction = {
        time: time,
        hour: hour,
        level: this.getLevel(hour, baseSpeed, u[index], f[index], baseValue)
      };

      results.push(prediction);
    });
    return results
  }

  getLevel(hour, modelBaseSpeed, modelU, modelF, modelBaseValue) {
    const amplitudes = [];
    let result = 0;

    this.constituents.forEach(constituent => {
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
  }

  prepare(radians) {
    radians = typeof radians !== 'undefined' ? radians : true;
    const baseAstro = astro(this.start);

    const baseValue = {};
    const baseSpeed = {};
    const u = [];
    const f = [];
    this.constituents.forEach(constituent => {
      const value = constituent._model.value(baseAstro);
      const speed = constituent._model.speed(baseAstro);
      baseValue[constituent.name] = radians ? d2r * value : value;
      baseSpeed[constituent.name] = radians ? d2r * speed : speed;
    });
    this.timeline.items.forEach(time => {
      const uItem = {};
      const fItem = {};
      const itemAstro = astro(time);
      this.constituents.forEach(constituent => {
        const constituentU = modulus$1(constituent._model.u(itemAstro), 360);

        uItem[constituent.name] = radians ? d2r * constituentU : constituentU;
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
  }
}

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

const extendedDoodson = {
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
const dotArray = (a, b) => {
  const results = [];
  a.forEach((value, index) => {
    results.push(value * b[index]);
  });
  return results.reduce((total, value) => {
    return total + value
  })
};

const sortedDoodson = {};
Object.keys(extendedDoodson).forEach(key => {
  sortedDoodson[extendedDoodson[key]] = key;
});

class Constituent {
  constructor(name, doodsonNumber, coefficients, u, f) {
    this.name = name;
    if (!doodsonNumber && !coefficients) {
      throw new Error(
        'Doodson or coefficient must be defined for a constituent'
      )
    }
    if (!doodsonNumber && coefficients) {
      this.coefficients = coefficients;
    } else {
      this.coefficients = this.doodsonNumberToCooeficient(doodsonNumber);
    }
    this.u = typeof u !== 'undefined' ? u : corrections.uZero;
    this.f = typeof f !== 'undefined' ? f : corrections.fUnity;
  }

  doodsonNumberToCooeficient(doodsonNumber) {
    const coefficeint = [];
    doodsonNumber.split('').forEach(letter => {
      if (letter.search(/\w/) === -1) {
        return
      }
      coefficeint.push(extendedDoodson[letter.toUpperCase()]);
    });
    return coefficeint
  }

  cooeficientToDoodsonNumber(coefficients) {
    coefficients =
      typeof coefficients !== 'undefined' ? coefficients : this.coefficients;
    const doodsonNumber = [];
    coefficients.forEach(coefficient => {
      doodsonNumber.push(sortedDoodson[coefficient]);
    });
    return doodsonNumber.join('')
  }

  value(astro) {
    return dotArray(this.coefficients, this.astronomicValues(astro))
  }

  speed(astro) {
    return dotArray(this.coefficients, this.astronomicSpeed(astro))
  }

  astronimicDoodsonNumber(astro) {
    return [
      astro['T+h-s'],
      astro.s,
      astro.h,
      astro.p,
      astro.N,
      astro.pp,
      astro['90']
    ]
  }

  astronomicSpeed(astro) {
    const results = [];
    this.astronimicDoodsonNumber(astro).forEach(number => {
      results.push(number.speed);
    });
    return results
  }

  astronomicValues(astro) {
    const results = [];
    this.astronimicDoodsonNumber(astro).forEach(number => {
      results.push(number.value);
    });
    return results
  }

  // Consider two out of phase constituents which travel at the same speed to
  // be identical
  isEqual(constituent) {
    return (
      this.cooeficientToDoodsonNumber() ===
      constituent.cooeficientToDoodsonNumber()
    )
  }

  hash() {
    const hash = [];
    this.coefficients.forEach(coefficient => {
      if (coefficient < 0) {
        hash.push(`m${coefficient * -1}`);
      } else {
        hash.push(coefficient);
      }
    });
    return hash.join('')
  }
}

class compoundConstituent {
  constructor(name, members) {
    this.name = name;
    this.members = members;
    const coefficients = [];
    members.forEach(({ constituent, factor }) => {
      constituent.coefficients.forEach((coefficient, index) => {
        if (typeof coefficients[index] === 'undefined') {
          coefficients[index] = 0;
        }
        coefficients[index] += coefficient * factor;
      });
    });
    this.coefficients = coefficients;
  }

  speed(astro) {
    let speed = 0;
    this.members.forEach(({ constituent, factor }) => {
      speed += constituent.speed(astro) * factor;
    });
    return speed
  }

  value(astro) {
    let value = 0;
    this.members.forEach(({ constituent, factor }) => {
      value += constituent.value(astro) * factor;
    });
    return value
  }

  u(astro) {
    let u = 0;
    this.members.forEach(({ constituent, factor }) => {
      u += constituent.u(astro) * factor;
    });
    return u
  }

  f(astro) {
    const f = [];
    this.members.forEach(({ constituent, factor }) => {
      f.push(Math.pow(constituent.f(astro), Math.abs(factor)));
    });
    return f.reduce((previous, value) => {
      return previous * value
    })
  }
}

const constituents = {};
// Long Term
constituents.Z0 = new Constituent('Z0', 'Z ZZZ ZZZ', false, corrections.uZero, corrections.fUnity);
constituents.SA = new Constituent('Sa', 'Z ZAZ ZZZ', false, corrections.uZero, corrections.fUnity);
constituents.SSA = new Constituent(
  'Ssa',
  'Z ZBZ ZZZ',
  false,
  corrections.uZero,
  corrections.fUnity
);
constituents.MM = new Constituent('MM', 'Z AZY ZZZ', false, corrections.uZero, corrections.fMm);
constituents.MF = new Constituent('MF', 'Z BZZ ZZZ', false, corrections.uMf, corrections.fMf);
// Diurnals
constituents.Q1 = new Constituent('Q1', 'A XZA ZZA', false, corrections.uO1, corrections.fO1);
constituents.O1 = new Constituent('O1', 'A YZZ ZZA', false, corrections.uO1, corrections.fO1);
constituents.K1 = new Constituent('K1', 'A AZZ ZZY', false, corrections.uK1, corrections.fK1);
constituents.J1 = new Constituent('J1', 'A BZY ZZY', false, corrections.uJ1, corrections.fJ1);
constituents.M1 = new Constituent('M1', 'A ZZZ ZZA', false, corrections.uM1, corrections.fM1);
constituents.P1 = new Constituent('P1', 'A AXZ ZZA', false, corrections.uZero, corrections.fUnity);
constituents.S1 = new Constituent('S1', 'A AYZ ZZZ', false, corrections.uZero, corrections.fUnity);
constituents.OO1 = new Constituent('OO1', 'A CZZ ZZY', false, corrections.uOO1, corrections.fOO1);
// Semi diurnals
constituents['2N2'] = new Constituent('2N2', 'B XZB ZZZ', false, corrections.uM2, corrections.fM2);
constituents.N2 = new Constituent('N2', 'B YZA ZZZ', false, corrections.uM2, corrections.fM2);
constituents.NU2 = new Constituent('NU2', 'B YBY ZZZ', false, corrections.uM2, corrections.fM2);
constituents.M2 = new Constituent('M2', 'B ZZZ ZZZ', false, corrections.uM2, corrections.fM2);
constituents.LAM2 = new Constituent('LAM2', 'B AXA ZZB', false, corrections.uM2, corrections.fM2);
constituents.L2 = new Constituent('L2', 'B AZY ZZB', false, corrections.uL2, corrections.fL2);
constituents.T2 = new Constituent('T2', 'B BWZ ZAZ', false, corrections.uZero, corrections.fUnity);
constituents.S2 = new Constituent('S2', 'B BXZ ZZZ', false, corrections.uZero, corrections.fUnity);
constituents.R2 = new Constituent('R2', 'B BYZ ZYB', false, corrections.uZero, corrections.fUnity);
constituents.K2 = new Constituent('K2', 'B BZZ ZZZ', false, corrections.uK2, corrections.fK2);
// Third diurnal
constituents.M3 = new Constituent(
  'M3',
  'C ZZZ ZZZ',
  false,
  a => {
    return corrections.uModd(a, 3)
  },
  a => {
    return corrections.fModd(a, 3)
  }
);
// Compound
constituents.MSF = new compoundConstituent('MSF', [
  { constituent: constituents.S2, factor: 1 },
  { constituent: constituents.M2, factor: -1 }
]);

// Diurnal
constituents['2Q1'] = new compoundConstituent('2Q1', [
  { constituent: constituents.N2, factor: 1 },
  { constituent: constituents.J1, factor: -1 }
]);
constituents.RHO = new compoundConstituent('RHO', [
  { constituent: constituents.NU2, factor: 1 },
  { constituent: constituents.K1, factor: -1 }
]);

// Semi-Diurnal

constituents.MU2 = new compoundConstituent('MU2', [
  { constituent: constituents.M2, factor: 2 },
  { constituent: constituents.S2, factor: -1 }
]);
constituents['2SM2'] = new compoundConstituent('2SM2', [
  { constituent: constituents.S2, factor: 2 },
  { constituent: constituents.M2, factor: -1 }
]);

// Third-Diurnal
constituents['2MK3'] = new compoundConstituent('2MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.O1, factor: 1 }
]);
constituents.MK3 = new compoundConstituent('MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.K1, factor: 1 }
]);

// Quarter-Diurnal
constituents.MN4 = new compoundConstituent('MN4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.N2, factor: 1 }
]);
constituents.M4 = new compoundConstituent('M4', [
  { constituent: constituents.M2, factor: 2 }
]);
constituents.MS4 = new compoundConstituent('MS4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.S2, factor: 1 }
]);
constituents.S4 = new compoundConstituent('S4', [
  { constituent: constituents.S2, factor: 2 }
]);

// Sixth-Diurnal
constituents.M6 = new compoundConstituent('M6', [
  { constituent: constituents.M2, factor: 3 }
]);
constituents.S6 = new compoundConstituent('S6', [
  { constituent: constituents.S2, factor: 3 }
]);

// Eighth-Diurnals
constituents.M8 = new compoundConstituent('M8', [
  { constituent: constituents.M2, factor: 4 }
]);

class Harmonics {
  /**
   * Sets up a new harmonics class.
   * @constructor
   */
  constructor(constituents$1) {
    this.requiredFields = [
      'name',
      'amplitude',
      'phase_GMT',
      'phase_local',
      'speed'
    ];

    if (!Array.isArray(constituents$1)) {
      throw new Error('Harmonic constituents are not an array')
    }
    this.constituents = [];
    constituents$1.forEach((constituent, index) => {
      this.requiredFields.forEach(field => {
        if (typeof constituent[field] === 'undefined') {
          throw new Error(`Harmonic constituent entry missing field ${field}`)
        }
      });
      if (typeof constituents[constituent.name] !== 'undefined') {
        constituent._model = constituents[constituent.name];
        this.constituents.push(constituent);
      }
    });
  }

  setOffset(offset) {
    this.constituents.push({
      name: 'Z0',
      _model: constituents.Z0,
      _offsetPhase: 0,
      amplitude: offset
    });
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {Date, unix timestamp} start
   * @param {Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.start = this.getDate(start);
    this.end = this.getDate(end);
    if (this.start.getTime() >= this.end.getTime()) {
      throw new Error('Start time must be before end time')
    }
  }

  timelineIsSet() {
    return !(
      typeof this.start === 'undefined' || typeof this.end === 'undefined'
    )
  }

  /**
   * Helper function to check that a date is valid,
   * returns an instance of Date.
   * @param {Date, unix timestamp} time
   */
  getDate(time) {
    if (time instanceof Date) {
      return time
    }
    if (typeof time === 'number') {
      return new Date(time * 1000)
    }
    throw new Error(
      'Invalid date format, should be a Date object, or timestamp'
    )
  }

  /**
   * Returns unix timestamps between start and end
   * times, divided by number of seconds. Defaults to 10 minutes.
   * Also returns an array of raw hours between those times for
   * heruristic modeling.
   * @param {number} seconds
   */
  timeline(seconds) {
    seconds = typeof seconds !== 'undefined' ? seconds : 10 * 60;
    const timeline = [];
    const end = this.end.getTime() / 1000;
    let lastTime = this.start.getTime() / 1000;
    const startTime = lastTime;
    const hours = [];
    while (lastTime <= end) {
      timeline.push(new Date(lastTime * 1000));
      hours.push((lastTime - startTime) / (60 * 60));
      lastTime += seconds;
    }

    return {
      items: timeline,
      hours: hours
    }
  }

  /**
   * Returns a prediction class
   */
  getPrediction() {
    return new Prediction({
      timeline: this.timeline(),
      constituents: this.constituents,
      start: this.start
    })
  }
}

class TidePrediction {
  constructor(stationInfo) {
    this.harmonics = [];
    this.isSubordinate = false;
    this.stationInfo = stationInfo;
    this.setHarmonicConstituents(stationInfo.HarmonicConstituents);
    this.setIsSubordinate(
      typeof stationInfo.isSubordinate !== 'undefined'
        ? stationInfo.isSubordinate
        : false
    );
  }

  setIsSubordinate(isSubordinate) {
    this.isSubordinate = isSubordinate;
  }

  setHarmonicConstituents(constituents) {
    this.harmonics = new Harmonics(constituents);
  }

  setOffset(offset) {
    this.harmonics.setOffset(offset);
  }

  /**
   * Sets the start & stop time to get data from.
   * @param {Date, unix timestamp} start
   * @param {Date, unix timestamp} end
   */
  setTimeSpan(start, end) {
    this.harmonics.setTimeSpan(start, end);
  }

  getTimelinePrediction() {
    if (!this.harmonics.timelineIsSet()) {
      throw new Error('Start and end times not set')
    }
    const prediction = this.harmonics.getPrediction();
    return prediction.getTimelinePrediction()
  }

  getExtremesPrediction() {
    if (!this.harmonics.timelineIsSet()) {
      throw new Error('Start and end times not set')
    }
    const prediction = this.harmonics.getPrediction();
    return prediction.getExtremesPrediction()
  }

  getWaterLevelAtTime(time) {
    const harmonic = new Harmonics(this.stationInfo.HarmonicConstituents);
    const endDate = new Date(time.getTime() + 10 * 60 * 1000);
    harmonic.setTimeSpan(time, endDate);
    return harmonic.getPrediction().getTimelinePrediction()[0]
  }
}

export default TidePrediction;
