import { defineCompoundConstituent } from "./index.js";
import R2 from "./R2.js";

/**
 * Solar elliptic terdiurnal; 1.5 times R2 (smaller solar elliptic semi-diurnal).
 *
 * Note: Generated only in shallow water; very small amplitude (<0.05 cm typical).
 * Usually negligible except in extreme shallow-water environments.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("R3", [{ constituent: R2, factor: 1.5 }]);
