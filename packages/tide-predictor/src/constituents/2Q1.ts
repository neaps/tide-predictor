import { defineCompoundConstituent } from "./index.js";
import N2 from "./N2.js";
import J1 from "./J1.js";

/**
 * Shallow-water diurnal (2Q1).
 * Compound constituent: N2-J1
 * Speed ~12.854°/h with period ~27.93 hours (diurnal).
 * Derived from interaction of semi-diurnal N2 and diurnal J1 constituents.
 * Nodal factor combines effects from both parent constituents: fN2/fJ1 with phase uN2-uJ1.
 * Amplitude typically very small; rarely significant.
 * Found only in shallow-water regions with strong tidal distortion.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("2Q1", [
  { constituent: N2, factor: 1 },
  { constituent: J1, factor: -1 },
]);
