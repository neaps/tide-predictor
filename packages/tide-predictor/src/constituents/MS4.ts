import { defineCompoundConstituent } from "./definition.js";
import M2 from "./M2.js";
import S2 from "./S2.js";

/**
 * Shallow-water quarter-diurnal (MS4).
 * Compound constituent: M2 + S2
 * Lunar-solar interaction from M2 and S2 semi-diurnal components.
 * Generated in shallow-water environments; typical amplitude 1-5 cm.
 * Often second-largest quarter-diurnal component after M4.
 */
export default defineCompoundConstituent("MS4", [
  { constituent: M2, factor: 1 },
  { constituent: S2, factor: 1 },
]);
