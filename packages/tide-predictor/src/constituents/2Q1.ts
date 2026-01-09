import { defineCompoundConstituent } from "./index.js";
import N2 from "./N2.js";
import J1 from "./J1.js";

/**
 * Shallow-water diurnal (2Q1 = N2-J1).
 * Derived from interaction of semi-diurnal N2 and diurnal J1 constituents.
 * Amplitude typically very small; rarely significant.
 * Found only in shallow-water regions with strong tidal distortion.
 */
export default defineCompoundConstituent("2Q1", [
  { constituent: N2, factor: 1 },
  { constituent: J1, factor: -1 },
]);
