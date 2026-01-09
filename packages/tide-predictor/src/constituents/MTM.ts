import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import T2 from "./T2.js";

/**
 * Lunar-solar shallow-water interaction (M2 modulated by lunar orbit).
 *
 * Warning: Not in modern IHO standard constituents; mostly historical interest.
 * Often replaced by specific ν2, λ2, or other lunar elliptic terms in modern analysis.
 * Amplitude is location and depth-dependent.
 *
 * @see NOAA CO-OPS shallow-water variants
 * @see Schureman Manual
 */
export default defineCompoundConstituent("MTM", [
  { constituent: M2, factor: 1 },
  { constituent: T2, factor: 1 },
]);
