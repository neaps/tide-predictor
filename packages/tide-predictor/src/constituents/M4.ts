import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";

/**
 * Shallow-water quarter-diurnal (M4).
 * Compound constituent: 2×M2
 * Speed ~57.97°/h with period ~6.21 hours (quarter-diurnal).
 * First overtide of M2; generated in shallow-water environments.
 * Nodal factor: (fM2)² with phase 2×uM2.
 * Amplitude typically 2-10% of M2; largest of the quarter-diurnal constituents.
 * Important indicator of shallow-water tidal distortion.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("M4", [{ constituent: M2, factor: 2 }]);
