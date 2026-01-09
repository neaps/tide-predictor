import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import O1 from "./O1.js";

/**
 * Shallow-water terdiurnal (2MK3 = M2 + O1).
 * Lunar-lunar interaction from M2 semi-diurnal and O1 diurnal components.
 * Generated in shallow-water environments; typical amplitude <1 cm.
 */
export default defineCompoundConstituent("2MK3", [
  { constituent: M2, factor: 1 },
  { constituent: O1, factor: 1 },
]);
