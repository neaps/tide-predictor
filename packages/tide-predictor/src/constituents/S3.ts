import { defineCompoundConstituent } from "./index.js";
import S2 from "./S2.js";

/**
 * Solar terdiurnal overtide; shallow-water only.
 * Doodson Number: 333.555
 * Speed fixed at 45.0°/h (= 1.5 × S2) with period ~8.0 hours.
 * No nodal modulation (solar constituent - invariant).
 *
 * Note: Generated only in shallow water; not found in deep ocean.
 * Typical amplitude <1 cm except in extreme shallow-water environments.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("S3", [{ constituent: S2, factor: 1.5 }]);
