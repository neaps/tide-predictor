import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import N2 from "./N2.js";

/**
 * Shallow-water quarter-diurnal (MN4).
 * Compound constituent: M2 + N2
 * Lunar-lunar elliptic interaction from M2 and N2 semi-diurnal components.
 * Generated in shallow-water environments; typical amplitude 1-5 cm.
 * Often significant in shallow seas and estuaries.
 */
export default defineCompoundConstituent("MN4", [
  { constituent: M2, factor: 1 },
  { constituent: N2, factor: 1 },
]);
