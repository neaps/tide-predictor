import { defineCompoundConstituent } from "./index.js";
import S2 from "./S2.js";

/**
 * Shallow-water quarter-diurnal (S4).
 * Compound constituent: 2×S2
 * Speed 60.00°/h with period exactly 6.00 hours (quarter-diurnal).
 * First overtide of S2; generated in shallow-water environments.
 * No nodal corrections (solar constituent).
 * Amplitude typically 1-3% of S2; smallest of the common quarter-diurnal constituents.
 * Purely solar, so has fixed amplitude and phase at any location.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("S4", [{ constituent: S2, factor: 2 }]);
