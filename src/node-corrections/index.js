import { d2r, r2d } from '../constants'

export default {
  f_unity() {
    return 1
  },

  //// Schureman equations 73, 65
  f_Mm(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const mean =
      (2 / 3.0 - Math.pow(Math.sin(omega), 2)) *
      (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2))
    return (2 / 3.0 - Math.pow(Math.sin(I), 2)) / mean
  },

  //Schureman equations 74, 66
  f_Mf(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const mean = Math.pow(Math.sin(omega), 2) * Math.pow(Math.cos(0.5 * i), 4)
    return Math.pow(Math.sin(I), 2) / mean
  },

  // Schureman equations 75, 67
  f_O1(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const mean =
      Math.sin(omega) *
      Math.pow(Math.cos(0.5 * omega), 2) *
      Math.pow(Math.cos(0.5 * i), 4)
    return (Math.sin(I) * Math.pow(Math.cos(0.5 * I), 2)) / mean
  },

  //Schureman equations 76, 68
  f_J1(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const mean =
      Math.sin(2 * omega) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2))
    return Math.sin(2 * I) / mean
  },

  // Schureman equations 77, 69
  f_OO1(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const mean =
      Math.sin(omega) *
      Math.pow(Math.sin(0.5 * omega), 2) *
      Math.pow(Math.cos(0.5 * i), 4)
    return (Math.sin(I) * Math.pow(Math.sin(0.5 * I), 2)) / mean
  },

  // Schureman equations 78, 70
  f_M2(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const mean =
      Math.pow(Math.cos(0.5 * omega), 4) * Math.pow(Math.cos(0.5 * i), 4)
    return Math.pow(Math.cos(0.5 * I), 4) / mean
  },

  // Schureman equations 227, 226, 68
  // Should probably eventually include the derivations of the magic numbers (0.5023 etc).
  f_K1(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const nu = d2r * a.nu.value
    const sin2Icosnu_mean =
      Math.sin(2 * omega) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2))
    const mean = 0.5023 * sin2Icosnu_mean + 0.1681
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
  f_L2(a) {
    const P = d2r * a.P.value
    const I = d2r * a.I.value
    const R_a_inv = Math.pow(
      1 -
        12 * Math.pow(Math.tan(0.5 * I), 2) * Math.cos(2 * P) +
        36 * Math.pow(Math.tan(0.5 * I), 4),
      0.5
    )
    return this.f_M2(a) * R_a_inv
  },

  // Schureman equations 235, 234, 71
  // Again, magic numbers
  f_K2(a) {
    const omega = d2r * a.omega.value
    const i = d2r * a.i.value
    const I = d2r * a.I.value
    const nu = d2r * a.nu.value
    const sinsqIcos2nu_mean =
      Math.sin(omega) ** 2 * (1 - (3 / 2.0) * Math.sin(i) ** 2)
    const mean = 0.5023 * sinsqIcos2nu_mean + 0.0365
    return (
      Math.pow(
        0.2533 * Math.pow(Math.sin(I), 4) +
          0.0367 * Math.pow(Math.sin(I), 2) * Math.cos(2 * nu) +
          0.0013,
        0.5
      ) / mean
    )
  },
  // Schureman equations 206, 207, 195
  f_M1(a) {
    const P = d2r * a.P.value
    const I = d2r * a.I.value
    const Q_a_inv = Math.pow(
      0.25 +
        1.5 *
          Math.cos(I) *
          Math.cos(2 * P) *
          Math.pow(Math.cos(0.5 * I), -0.5) +
        2.25 * Math.pow(Math.cos(I), 2) * Math.pow(Math.cos(0.5 * I), -4),
      0.5
    )
    return this.f_O1(a) * Q_a_inv
  },

  // See e.g. Schureman equation 149
  f_Modd(a, n) {
    return Math.pow(this.f_M2(a), n / 2.0)
  },

  // Node factors u, see Table 2 of Schureman.

  u_zero(a) {
    return 0.0
  },

  u_Mf(a) {
    return -2.0 * a.xi.value
  },

  u_O1(a) {
    return 2.0 * a.xi.value - a.nu.value
  },

  u_J1(a) {
    return -a.nu.value
  },

  u_OO1(a) {
    return -2.0 * a.xi.value - a.nu.value
  },

  u_M2(a) {
    return 2.0 * a.xi.value - 2.0 * a.nu.value
  },

  u_K1(a) {
    return -a.nup.value
  },

  //Schureman 214
  u_L2(a) {
    const I = d2r * a.I.value
    const P = d2r * a.P.value
    const R =
      r2d *
      Math.atan(
        Math.sin(2 * P) /
          ((1 / 6.0) * Math.pow(Math.tan(0.5 * I), -2) - Math.cos(2 * P))
      )
    return 2.0 * a.xi.value - 2.0 * a.nu.value - R
  },

  u_K2(a) {
    return -2.0 * a.nupp.value
  },

  //Schureman 202
  u_M1(a) {
    const I = d2r * a.I.value
    const P = d2r * a.P.value
    const Q =
      r2d *
      Math.atan(((5 * Math.cos(I) - 1) / (7 * Math.cos(I) + 1)) * Math.tan(P))
    return a.xi.value - a.nu.value + Q
  },

  u_Modd(a, n) {
    return (n / 2.0) * this.u_M2(a)
  }
}
