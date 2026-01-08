import { defineCompoundConstituent } from "./index.js";
import S2 from "./S2.js";
import M2 from "./M2.js";

/**
 * Shallow-water semi-diurnal (2SM2).
 * Compound constituent: 2×S2 - M2
 * Speed ~31.02°/h with period ~11.61 hours.
 * Solar-lunar interaction constituent generated in shallow-water environments.
 * Nodal factors combine (fS2)² with inverse M2 effects.
 * Amplitude typically <2% of M2; complementary to MU2.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("2SM2", [
  { constituent: S2, factor: 2 },
  { constituent: M2, factor: -1 },
]);
