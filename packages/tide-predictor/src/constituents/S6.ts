import { defineCompoundConstituent } from "./index.js";
import S2 from "./S2.js";

/**
 * Shallow-water sixth-diurnal (S6).
 * Compound constituent: 3×S2
 * Speed 90.00°/h with period exactly 4.00 hours (sixth-diurnal).
 * Second overtide of S2; generated in shallow-water environments.
 * No nodal corrections (solar constituent).
 * Amplitude typically 0.5-1% of S2; smallest of the common overtides.
 * Rarely significant except in extreme shallow water or resonant systems.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("S6", [{ constituent: S2, factor: 3 }]);
