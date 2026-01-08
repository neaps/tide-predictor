import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";

/**
 * Shallow-water eighth-diurnal (M8).
 * Compound constituent: 4×M2
 * Speed ~115.94°/h with period ~3.11 hours (eighth-diurnal).
 * Third overtide of M2; generated in extreme shallow-water environments.
 * Nodal factor: (fM2)⁴ with phase 4×uM2.
 * Amplitude typically <0.5% of M2; very rarely significant.
 * Found only in highly distorted tidal regimes (extreme shallow water, enclosed basins).
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("M8", [{ constituent: M2, factor: 4 }]);
