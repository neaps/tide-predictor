import { defineCompoundConstituent } from "./definition.js";
import S2 from "./S2.js";

/**
 * Shallow-water sixth-diurnal (S6).
 * Compound constituent: 3×S2
 * Second overtide of S2; generated in shallow-water environments.
 * Amplitude typically 0.5-1% of S2; smallest of the common overtides.
 * Rarely significant except in extreme shallow water or resonant systems.
 */
export default defineCompoundConstituent("S6", [{ constituent: S2, factor: 3 }]);
