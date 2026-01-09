import { defineCompoundConstituent } from "./definition.js";
import M2 from "./M2.js";

/**
 * Shallow-water sixth-diurnal (M6 = 3×M2).
 * Second overtide of M2; generated in shallow-water environments.
 * Amplitude typically 0.5-3% of M2; important in extreme shallow water.
 * Indicator of significant tidal distortion and non-linear effects.
 */
export default defineCompoundConstituent("M6", [{ constituent: M2, factor: 3 }]);
