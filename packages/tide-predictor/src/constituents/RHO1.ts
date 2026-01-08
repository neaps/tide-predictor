import { defineCompoundConstituent } from "./index.js";
import NU2 from "./NU2.js";
import K1 from "./K1.js";

/**
 * Shallow-water diurnal (RHO1, ρ1).
 * Compound constituent: NU2-K1 (ν2-K1)
 * Speed ~13.471°/h with period ~26.72 hours (diurnal).
 * Derived from interaction of semi-diurnal NU2 and diurnal K1 constituents.
 * Nodal factor combines effects from both parent constituents: fNU2/fK1 with phase uNU2-uK1.
 * Amplitude typically very small; rarely significant.
 * Found only in shallow-water regions with strong tidal distortion.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("RHO1", [
  { constituent: NU2, factor: 1 },
  { constituent: K1, factor: -1 },
]);
