import { defineCompoundConstituent } from "./definition.js";
import M2 from "./M2.js";
import S2 from "./S2.js";

/**
 * Shallow-water semi-diurnal (MU2 or μ2).
 * Compound constituent: 2×M2 - S2
 * Lunar variational constituent generated in shallow-water environments.
 * Amplitude typically <2% of M2; found in coastal shallow-water predictions.
 */
export default defineCompoundConstituent("MU2", [
  { constituent: M2, factor: 2 },
  { constituent: S2, factor: -1 },
]);
