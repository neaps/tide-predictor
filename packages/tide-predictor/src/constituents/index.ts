import constituent from "./constituent.js";
import compoundConstituent from "./compound-constituent.js";
import nc from "../node-corrections/index.js";
import type { Constituent } from "./constituent.js";
import type { CompoundConstituent } from "./compound-constituent.js";

export interface Constituents {
  Z0: Constituent;
  SA: Constituent;
  SSA: Constituent;
  MM: Constituent;
  MF: Constituent;
  Q1: Constituent;
  O1: Constituent;
  K1: Constituent;
  J1: Constituent;
  M1: Constituent;
  P1: Constituent;
  S1: Constituent;
  OO1: Constituent;
  "2N2": Constituent;
  N2: Constituent;
  NU2: Constituent;
  M2: Constituent;
  LAM2: Constituent;
  LAMBDA2: Constituent;
  L2: Constituent;
  T2: Constituent;
  S2: Constituent;
  R2: Constituent;
  K2: Constituent;
  M3: Constituent;
  EP2: Constituent;
  MA2: Constituent;
  MB2: Constituent;
  SGM: Constituent;
  MSF: CompoundConstituent;
  "2Q1": CompoundConstituent;
  RHO1: CompoundConstituent;
  RHO: CompoundConstituent;
  MU2: CompoundConstituent;
  "2SM2": CompoundConstituent;
  "2MK3": CompoundConstituent;
  MK3: CompoundConstituent;
  MN4: CompoundConstituent;
  M4: CompoundConstituent;
  MS4: CompoundConstituent;
  S4: CompoundConstituent;
  M6: CompoundConstituent;
  S6: CompoundConstituent;
  M8: CompoundConstituent;
  MSQM: CompoundConstituent;
  MTM: CompoundConstituent;
  MKS2: CompoundConstituent;
  N4: CompoundConstituent;
  S3: CompoundConstituent;
  T3: CompoundConstituent;
  R3: CompoundConstituent;
  "3L2": CompoundConstituent;
  "3N2": CompoundConstituent;
  "2MS6": CompoundConstituent;
  "2MK5": CompoundConstituent;
  "2MO5": CompoundConstituent;
}

const constituents: Partial<Constituents> = {};

// Long Term
constituents.Z0 = constituent("Z0", [0, 0, 0, 0, 0, 0, 0], nc.uZero, nc.fUnity);
constituents.SA = constituent("Sa", [0, 0, 1, 0, 0, 0, 0], nc.uZero, nc.fUnity);
constituents.SSA = constituent("Ssa", [0, 0, 2, 0, 0, 0, 0], nc.uZero, nc.fUnity);
constituents.MM = constituent("MM", [0, 1, 0, -1, 0, 0, 0], nc.uZero, nc.fMm);
constituents.MF = constituent("MF", [0, 2, 0, 0, 0, 0, 0], nc.uMf, nc.fMf);
// Diurnals
constituents.Q1 = constituent("Q1", [1, -2, 0, 1, 0, 0, 1], nc.uO1, nc.fO1);
constituents.O1 = constituent("O1", [1, -1, 0, 0, 0, 0, 1], nc.uO1, nc.fO1);
constituents.K1 = constituent("K1", [1, 1, 0, 0, 0, 0, -1], nc.uK1, nc.fK1);
constituents.J1 = constituent("J1", [1, 2, 0, -1, 0, 0, -1], nc.uJ1, nc.fJ1);
constituents.M1 = constituent("M1", [1, 0, 0, 0, 0, 0, 1], nc.uM1, nc.fM1);
constituents.P1 = constituent("P1", [1, 1, -2, 0, 0, 0, 1], nc.uZero, nc.fUnity);
constituents.S1 = constituent("S1", [1, 1, -1, 0, 0, 0, 0], nc.uZero, nc.fUnity);
constituents.OO1 = constituent("OO1", [1, 3, 0, 0, 0, 0, -1], nc.uOO1, nc.fOO1);
// Semi diurnals
constituents["2N2"] = constituent("2N2", [2, -2, 0, 2, 0, 0, 0], nc.uM2, nc.fM2);
constituents.N2 = constituent("N2", [2, -1, 0, 1, 0, 0, 0], nc.uM2, nc.fM2);
constituents.NU2 = constituent("NU2", [2, -1, 2, -1, 0, 0, 0], nc.uM2, nc.fM2);
constituents.M2 = constituent("M2", [2, 0, 0, 0, 0, 0, 0], nc.uM2, nc.fM2);
constituents.LAM2 = constituent("LAM2", [2, 1, -2, 1, 0, 0, 2], nc.uM2, nc.fM2);
constituents.LAMBDA2 = constituents.LAM2; // Alias
constituents.L2 = constituent("L2", [2, 1, 0, -1, 0, 0, 2], nc.uL2, nc.fL2);
constituents.T2 = constituent("T2", [2, 2, -3, 0, 0, 1, 0], nc.uZero, nc.fUnity);
constituents.S2 = constituent("S2", [2, 2, -2, 0, 0, 0, 0], nc.uZero, nc.fUnity);
constituents.R2 = constituent("R2", [2, 2, -1, 0, 0, -1, 2], nc.uZero, nc.fUnity);
constituents.K2 = constituent("K2", [2, 2, 0, 0, 0, 0, 0], nc.uK2, nc.fK2);
// Third diurnal
constituents.M3 = constituent(
  "M3",
  [3, 0, 0, 0, 0, 0, 0],
  (a) => {
    return nc.uModd(a, 3);
  },
  (a) => {
    return nc.fModd(a, 3);
  },
);
// Compound
constituents.MSF = compoundConstituent("MSF", [
  { constituent: constituents.S2!, factor: 1 },
  { constituent: constituents.M2!, factor: -1 },
]);

// Diurnal
constituents["2Q1"] = compoundConstituent("2Q1", [
  { constituent: constituents.N2!, factor: 1 },
  { constituent: constituents.J1!, factor: -1 },
]);
constituents.RHO = compoundConstituent("RHO", [
  { constituent: constituents.NU2!, factor: 1 },
  { constituent: constituents.K1!, factor: -1 },
]);
constituents.RHO1 = constituents.RHO; // Alias;

// Semi-Diurnal

constituents.MU2 = compoundConstituent("MU2", [
  { constituent: constituents.M2!, factor: 2 },
  { constituent: constituents.S2!, factor: -1 },
]);
constituents["2SM2"] = compoundConstituent("2SM2", [
  { constituent: constituents.S2!, factor: 2 },
  { constituent: constituents.M2!, factor: -1 },
]);

// Third-Diurnal
constituents["2MK3"] = compoundConstituent("2MK3", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.O1!, factor: 1 },
]);
constituents.MK3 = compoundConstituent("MK3", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.K1!, factor: 1 },
]);

// Quarter-Diurnal
constituents.MN4 = compoundConstituent("MN4", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.N2!, factor: 1 },
]);
constituents.M4 = compoundConstituent("M4", [{ constituent: constituents.M2!, factor: 2 }]);
constituents.MS4 = compoundConstituent("MS4", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.S2!, factor: 1 },
]);
constituents.S4 = compoundConstituent("S4", [{ constituent: constituents.S2!, factor: 2 }]);

// Sixth-Diurnal
constituents.M6 = compoundConstituent("M6", [{ constituent: constituents.M2!, factor: 3 }]);
constituents.S6 = compoundConstituent("S6", [{ constituent: constituents.S2!, factor: 3 }]);

// Eighth-Diurnals
constituents.M8 = compoundConstituent("M8", [{ constituent: constituents.M2!, factor: 4 }]);

// Semi-diurnal (lunar elliptic)
/**
 * Lunar elliptic semi-diurnal constituent (ε2).
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS constituent tables
 */
constituents.EP2 = constituent("EP2", [2, 0, 1, 0, 0, 0, 0], nc.uM2, nc.fM2);

/**
 * Lunar variational semi-diurnal constituent (μ2, mu2).
 * Derived from Moon's orbital parameter variations.
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 */
constituents.MA2 = constituent("MA2", [2, -2, 2, 0, 0, 0, 0], nc.uM2, nc.fM2);

/**
 * Lunar elliptic constituent from parameter variations.
 * @see Schureman, P. (1958). Manual of Harmonic Analysis and Prediction of Tides
 */
constituents.MB2 = constituent("MB2", [2, -2, 2, 0, 0, 0, 0], nc.uM2, nc.fM2);

// Diurnal (lunar variational)
/**
 * Lunar diurnal variational constituent (σ1, sigma1).
 * Derived from Moon's declination variations.
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 */
constituents.SGM = constituent("SGM", [1, -3, 2, 0, 0, 0, 0], nc.uK1, nc.fK1);

// Shallow-water compound constituents
/**
 * Lunar-solar interaction compound constituent.
 * Non-standard variant; definition varies by source.
 * @see NOAA CO-OPS shallow-water constituents
 * @see Schureman shallow-water analysis tables
 */
constituents.MSQM = compoundConstituent("MSQM", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.S2!, factor: 1 },
  { constituent: constituents.K1!, factor: 1 },
]);

/**
 * Lunar-solar shallow-water interaction.
 * Not in standard IHO constituents; regional application.
 * @see NOAA CO-OPS shallow-water variants
 */
constituents.MTM = compoundConstituent("MTM", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.T2!, factor: 1 },
]);

/**
 * Three-way shallow-water interaction of M2, K1, and S2.
 * Definition varies by application and depth.
 * @see NOAA CO-OPS shallow-water constituents
 */
constituents.MKS2 = compoundConstituent("MKS2", [
  { constituent: constituents.M2!, factor: 1 },
  { constituent: constituents.K1!, factor: 1 },
  { constituent: constituents.S2!, factor: -1 },
]);

/**
 * Second overtide of N2; shallow-water quarter-diurnal harmonic.
 * Amplitude ranges 0.25 to 2.25 times mean due to lunar node cycle.
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 */
constituents.N4 = compoundConstituent("N4", [{ constituent: constituents.N2!, factor: 2 }]);

/**
 * Solar terdiurnal overtide; shallow-water only.
 * Speed fixed at 45.0°/h (3 times per solar day).
 * No nodal modulation (solar constituent).
 * @see NOAA CO-OPS
 */
constituents.S3 = compoundConstituent("S3", [{ constituent: constituents.S2!, factor: 1.5 }]);

/**
 * Solar elliptic terdiurnal; 1.5 times T2.
 * Generated in shallow water only; minimal amplitude (<0.1 cm typical).
 * @see NOAA CO-OPS
 */
constituents.T3 = compoundConstituent("T3", [{ constituent: constituents.T2!, factor: 1.5 }]);

/**
 * Solar elliptic terdiurnal; 1.5 times R2.
 * Generated in shallow water only; very small amplitude (<0.05 cm typical).
 * @see NOAA CO-OPS
 */
constituents.R3 = compoundConstituent("R3", [{ constituent: constituents.R2!, factor: 1.5 }]);

/**
 * Triple lunar elliptic; 3 times L2 interaction.
 * Not in standard IHO constituent bank; mainly historical/theoretical interest.
 * Very small amplitude (<0.1 cm); found in extreme shallow water only.
 * @see Schureman, P. (1958). Manual of Harmonic Analysis and Prediction of Tides
 */
constituents["3L2"] = compoundConstituent("3L2", [{ constituent: constituents.L2!, factor: 3 }]);

/**
 * Triple N2 shallow-water harmonic.
 * Definition based on compound frequency estimates.
 * Typical amplitude <0.5 cm; often <0.1 cm except in extreme shallow-water environments.
 * @see NOAA CO-OPS shallow-water constituents
 */
constituents["3N2"] = compoundConstituent("3N2", [{ constituent: constituents.N2!, factor: 3 }]);

/**
 * Quarter-diurnal shallow-water interaction of M2 and S2.
 * Sometimes denoted as MS4 in alternative notation systems.
 * Nodal factor: (fM2)^2 (from M2^2 component).
 * Generated in shallow water; typical amplitude 0.01-0.2 meters depending on depth.
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS: Listed as NOAA order #37
 */
constituents["2MS6"] = compoundConstituent("2MS6", [
  { constituent: constituents.M2!, factor: 2 },
  { constituent: constituents.S2!, factor: 1 },
]);

/**
 * Shallow-water quinte-diurnal from M2-K1 interaction.
 * Components: 2×M2 (lunar semi-diurnal × 2) + K1 (lunisolar diurnal).
 * Period 8.18 hours. Amplitude typically 0.1-0.5 cm; found in coastal predictions.
 * Nodal factors combine (fM2)^2 with fK1.
 * @see NOAA CO-OPS
 */
constituents["2MK5"] = compoundConstituent("2MK5", [
  { constituent: constituents.M2!, factor: 2 },
  { constituent: constituents.K1!, factor: 1 },
]);

/**
 * Shallow-water quinte-diurnal from M2-O1 interaction.
 * Components: 2×M2 (lunar semi-diurnal × 2) + O1 (lunar diurnal).
 * Period 8.28 hours. Primarily shallow-water coastal phenomenon.
 * Amplitude typically <0.5 cm except in extreme shallow-water or enclosed basins.
 * Nodal factors combine (fM2)^2 with fO1.
 * @see NOAA CO-OPS
 */
constituents["2MO5"] = compoundConstituent("2MO5", [
  { constituent: constituents.M2!, factor: 2 },
  { constituent: constituents.O1!, factor: 1 },
]);

export default constituents as Constituents;
