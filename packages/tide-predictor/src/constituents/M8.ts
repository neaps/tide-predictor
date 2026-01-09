import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";

/**
 * Shallow-water eighth-diurnal (M8 = 4×M2).
 * Third overtide of M2; generated in extreme shallow-water environments.
 * Amplitude typically <0.5% of M2; very rarely significant.
 * Found only in highly distorted tidal regimes (extreme shallow water, enclosed basins).
 */
export default defineCompoundConstituent("M8", [{ constituent: M2, factor: 4 }]);
