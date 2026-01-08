import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import O1 from "./O1.js";

/**
 * Shallow-water terdiurnal (2MK3).
 * Compound constituent: M2 + O1
 * Speed ~42.93°/h with period ~8.39 hours (terdiurnal).
 * Lunar-lunar interaction from M2 semi-diurnal and O1 diurnal components.
 * Nodal factors combine fM2 with fO1.
 * Generated in shallow-water environments; typical amplitude <1 cm.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("2MK3", [
  { constituent: M2, factor: 1 },
  { constituent: O1, factor: 1 },
]);
