import { defineCompoundConstituent } from "./index.js";
import NU2 from "./NU2.js";
import K1 from "./K1.js";

/**
 * Shallow-water diurnal (RHO1, ρ1).
 * Compound constituent: NU2-K1 (ν2-K1)
 * Derived from interaction of semi-diurnal NU2 and diurnal K1 constituents.
 * Amplitude typically very small; rarely significant.
 * Found only in shallow-water regions with strong tidal distortion.
 */
export default defineCompoundConstituent("RHO1", [
  { constituent: NU2, factor: 1 },
  { constituent: K1, factor: -1 },
]);
