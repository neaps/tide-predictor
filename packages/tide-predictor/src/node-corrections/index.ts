import { d2r, r2d } from "../astronomy/constants.js";
import type { AstroData } from "../astronomy/index.js";

export type NodeCorrectionFunction = (a: AstroData, ...args: unknown[]) => number;

const corrections = {
  fUnity(): number {
    return 1;
  },

  // Schureman equations 73, 65
  fMm(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const mean =
      (2 / 3.0 - Math.pow(Math.sin(omega), 2)) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2));
    return (2 / 3.0 - Math.pow(Math.sin(I), 2)) / mean;
  },

  // Schureman equations 74, 66
  fMf(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const mean = Math.pow(Math.sin(omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.pow(Math.sin(I), 2) / mean;
  },

  // Schureman equations 75, 67
  fO1(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const mean =
      Math.sin(omega) * Math.pow(Math.cos(0.5 * omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return (Math.sin(I) * Math.pow(Math.cos(0.5 * I), 2)) / mean;
  },

  // Schureman equations 76, 68
  fJ1(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const mean = Math.sin(2 * omega) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2));
    return Math.sin(2 * I) / mean;
  },

  // Schureman equations 77, 69
  fOO1(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const mean =
      Math.sin(omega) * Math.pow(Math.sin(0.5 * omega), 2) * Math.pow(Math.cos(0.5 * i), 4);
    return (Math.sin(I) * Math.pow(Math.sin(0.5 * I), 2)) / mean;
  },

  // Schureman equations 78, 70
  fM2(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const mean = Math.pow(Math.cos(0.5 * omega), 4) * Math.pow(Math.cos(0.5 * i), 4);
    return Math.pow(Math.cos(0.5 * I), 4) / mean;
  },

  // Schureman equations 227, 226, 68
  // Should probably eventually include the derivations of the magic numbers (0.5023 etc).
  fK1(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const nu = d2r * a.nu.value;
    const sin2IcosnuMean = Math.sin(2 * omega) * (1 - (3 / 2.0) * Math.pow(Math.sin(i), 2));
    const mean = 0.5023 * sin2IcosnuMean + 0.1681;
    return (
      Math.pow(
        0.2523 * Math.pow(Math.sin(2 * I), 2) + 0.1689 * Math.sin(2 * I) * Math.cos(nu) + 0.0283,
        0.5,
      ) / mean
    );
  },

  // Schureman equations 215, 213, 204
  // It can be (and has been) confirmed that the exponent for R_a reads 1/2 via Schureman Table 7
  fL2(a: AstroData): number {
    const P = d2r * a.P.value;
    const I = d2r * a.I.value;
    const rAInv = Math.pow(
      1 -
        12 * Math.pow(Math.tan(0.5 * I), 2) * Math.cos(2 * P) +
        36 * Math.pow(Math.tan(0.5 * I), 4),
      0.5,
    );
    return corrections.fM2(a) * rAInv;
  },

  // Schureman equations 235, 234, 71
  // Again, magic numbers
  fK2(a: AstroData): number {
    const omega = d2r * a.omega.value;
    const i = d2r * a.i.value;
    const I = d2r * a.I.value;
    const nu = d2r * a.nu.value;
    const sinsqIcos2nuMean = Math.sin(omega) ** 2 * (1 - (3 / 2.0) * Math.sin(i) ** 2);
    const mean = 0.5023 * sinsqIcos2nuMean + 0.0365;
    return (
      Math.pow(
        0.2523 * Math.pow(Math.sin(I), 4) +
          0.0367 * Math.pow(Math.sin(I), 2) * Math.cos(2 * nu) +
          0.0013,
        0.5,
      ) / mean
    );
  },

  // Schureman equations 206, 207, 195
  fM1(a: AstroData): number {
    const P = d2r * a.P.value;
    const I = d2r * a.I.value;
    const qAInv = Math.pow(
      0.25 +
        1.5 * Math.cos(I) * Math.cos(2 * P) * Math.pow(Math.cos(0.5 * I), -0.5) +
        2.25 * Math.pow(Math.cos(I), 2) * Math.pow(Math.cos(0.5 * I), -4),
      0.5,
    );
    return corrections.fO1(a) * qAInv;
  },

  // See e.g. Schureman equation 149
  fModd(a: AstroData, n: number): number {
    return Math.pow(corrections.fM2(a), n / 2.0);
  },

  // Node factors u, see Table 2 of Schureman.

  uZero(): number {
    return 0.0;
  },

  uMf(a: AstroData): number {
    return -2.0 * a.xi.value;
  },

  uO1(a: AstroData): number {
    return 2.0 * a.xi.value - a.nu.value;
  },

  uJ1(a: AstroData): number {
    return -a.nu.value;
  },

  uOO1(a: AstroData): number {
    return -2.0 * a.xi.value - a.nu.value;
  },

  uM2(a: AstroData): number {
    return 2.0 * a.xi.value - 2.0 * a.nu.value;
  },

  uK1(a: AstroData): number {
    return -a.nup.value;
  },

  // Schureman 214
  uL2(a: AstroData): number {
    const I = d2r * a.I.value;
    const P = d2r * a.P.value;
    const R =
      r2d *
      Math.atan(Math.sin(2 * P) / ((1 / 6.0) * Math.pow(Math.tan(0.5 * I), -2) - Math.cos(2 * P)));
    return 2.0 * a.xi.value - 2.0 * a.nu.value - R;
  },

  uK2(a: AstroData): number {
    return -2.0 * a.nupp.value;
  },

  // Schureman 202
  uM1(a: AstroData): number {
    const I = d2r * a.I.value;
    const P = d2r * a.P.value;
    const Q = r2d * Math.atan(((5 * Math.cos(I) - 1) / (7 * Math.cos(I) + 1)) * Math.tan(P));
    return a.xi.value - a.nu.value + Q;
  },

  uModd(a: AstroData, n: number): number {
    return (n / 2.0) * corrections.uM2(a);
  },
};

export default corrections;
