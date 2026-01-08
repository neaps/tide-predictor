import { defineCompoundConstituent } from "./index.js";
import T2 from "./T2.js";

/**
 * Solar elliptic terdiurnal; 1.5 times T2 (larger solar elliptic semi-diurnal).
 * Doodson Number: ~438.555 (estimated from solar elliptic family)
 * Speed ~44.94°/h with period ~8.0 hours.
 * Minimal nodal modulation (solar constituent).
 * T2 reference: Doodson 272.555 (larger solar elliptic with speed ~60.0°/h).
 *
 * Note: Generated only in shallow water; minimal amplitude (<0.1 cm typical).
 * Rarely significant except in extreme shallow-water or enclosed basins.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("T3", [{ constituent: T2, factor: 1.5 }]);
