import { defineCompoundConstituent } from "./index.js";
import S2 from "./S2.js";
import M2 from "./M2.js";

/**
 * Shallow-water semi-diurnal (2SM2).
 * Compound constituent: 2×S2 - M2
 * Solar-lunar interaction constituent generated in shallow-water environments.
 * Amplitude typically <2% of M2; complementary to MU2.
 */
export default defineCompoundConstituent("2SM2", [
  { constituent: S2, factor: 2 },
  { constituent: M2, factor: -1 },
]);
