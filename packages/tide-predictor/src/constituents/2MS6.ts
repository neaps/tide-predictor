import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import S2 from "./S2.js";

/**
 * Sixth-diurnal shallow-water interaction: 2×M2 + S2.
 *
 * Generated only in shallow water; typical amplitude 0.01-0.2 meters depending on depth.
 * Included in IHO shallow-water constituent tables and NOAA analysis (order #37).
 */
export default defineCompoundConstituent("2MS6", [
  { constituent: M2, factor: 2 },
  { constituent: S2, factor: 1 },
]);
