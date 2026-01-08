import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import N2 from "./N2.js";

/**
 * Shallow-water quarter-diurnal (MN4).
 * Compound constituent: M2 + N2
 * Speed ~57.42°/h with period ~6.27 hours (quarter-diurnal).
 * Lunar-lunar elliptic interaction from M2 and N2 semi-diurnal components.
 * Nodal factors combine fM2 with fN2 (both use M2 nodal corrections).
 * Generated in shallow-water environments; typical amplitude 1-5 cm.
 * Often significant in shallow seas and estuaries.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("MN4", [
  { constituent: M2, factor: 1 },
  { constituent: N2, factor: 1 },
]);
