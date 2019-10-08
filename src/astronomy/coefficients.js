// Convert a sexagesimal angle into decimal degrees
export const sexagesimalToDecimal = (degrees, arcmins, arcsecs, mas, muas) => {
  arcmins = typeof arcmins !== 'undefined' ? arcmins : 0
  arcsecs = typeof arcsecs !== 'undefined' ? arcsecs : 0
  mas = typeof mas !== 'undefined' ? mas : 0
  muas = typeof muas !== 'undefined' ? muas : 0

  return (
    degrees +
    arcmins / 60.0 +
    arcsecs / (60.0 * 60.0) +
    mas / (60.0 * 60.0 * 1e3) +
    muas / (60.0 * 60.0 * 1e6)
  )
}

export default {
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
}
