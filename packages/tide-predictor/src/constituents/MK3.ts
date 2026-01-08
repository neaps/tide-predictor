import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import K1 from "./K1.js";

/**
 * Shallow-water terdiurnal (MK3).
 * Compound constituent: M2 + K1
 * Speed ~44.03°/h with period ~8.18 hours (terdiurnal).
 * Lunisolar interaction from M2 semi-diurnal and K1 diurnal components.
 * Nodal factors combine fM2 with fK1.
 * Generated in shallow-water environments; typical amplitude 0.5-2 cm.
 * Often paired with 2MK3 in terdiurnal tide analysis.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("MK3", [
  { constituent: M2, factor: 1 },
  { constituent: K1, factor: 1 },
]);
