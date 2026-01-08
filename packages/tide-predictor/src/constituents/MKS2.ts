import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import K1 from "./K1.js";
import S2 from "./S2.js";

/**
 * Three-way shallow-water interaction of M2, K1, and S2.
 * Speed ~29.5°/h with period ~12.0-12.1 hours.
 * Uses combined M2 and K1 nodal factors (fM2/uM2 and fK1/uK1).
 *
 * Warning: Not in standard IHO constituent bank. Shallow-water specific constituent
 * with definition varying by application and water depth. Use with caution and document
 * the specific convention used in your analysis.
 *
 * @see NOAA CO-OPS shallow-water constituents
 */
export default defineCompoundConstituent("MKS2", [
  { constituent: M2, factor: 1 },
  { constituent: K1, factor: 1 },
  { constituent: S2, factor: -1 },
]);
