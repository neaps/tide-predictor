import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import S2 from "./S2.js";

/**
 * Shallow-water semi-diurnal (MU2 or μ2).
 * Compound constituent: 2×M2 - S2
 * Speed ~27.97°/h with period ~12.87 hours.
 * Lunar variational constituent generated in shallow-water environments.
 * Nodal factors combine (fM2)² with inverse S2 effects.
 * Amplitude typically <2% of M2; found in coastal shallow-water predictions.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("MU2", [
  { constituent: M2, factor: 2 },
  { constituent: S2, factor: -1 },
]);
