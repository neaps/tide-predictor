import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";

/**
 * Shallow-water quarter-diurnal (M4 = 2×M2).
 * First overtide of M2; generated in shallow-water environments.
 * Amplitude typically 2-10% of M2; largest of the quarter-diurnal constituents.
 * Important indicator of shallow-water tidal distortion.
 */
export default defineCompoundConstituent("M4", [{ constituent: M2, factor: 2 }]);
