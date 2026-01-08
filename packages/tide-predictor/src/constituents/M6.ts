import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";

/**
 * Shallow-water sixth-diurnal (M6).
 * Compound constituent: 3×M2
 * Speed ~86.95°/h with period ~4.14 hours (sixth-diurnal).
 * Second overtide of M2; generated in shallow-water environments.
 * Nodal factor: (fM2)³ with phase 3×uM2.
 * Amplitude typically 0.5-3% of M2; important in extreme shallow water.
 * Indicator of significant tidal distortion and non-linear effects.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("M6", [{ constituent: M2, factor: 3 }]);
