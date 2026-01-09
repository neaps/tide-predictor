import { defineCompoundConstituent } from "./definition.js";
import S2 from "./S2.js";

/**
 * Shallow-water quarter-diurnal (S4).
 * Compound constituent: 2×S2
 * First overtide of S2; generated in shallow-water environments.
 * Amplitude typically 1-3% of S2; smallest of the common quarter-diurnal constituents.
 * Purely solar, so has fixed amplitude and phase at any location.
 */
export default defineCompoundConstituent("S4", [{ constituent: S2, factor: 2 }]);
