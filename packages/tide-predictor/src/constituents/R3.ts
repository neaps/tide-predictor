import { defineCompoundConstituent } from "./index.js";
import R2 from "./R2.js";

/**
 * Solar elliptic terdiurnal; 1.5 times R2 (smaller solar elliptic semi-diurnal).
 * Doodson Number: ~437.555 (estimated from solar elliptic family)
 * Speed ~45.04°/h with period ~8.0 hours.
 * No nodal modulation (solar constituent).
 * R2 reference: Doodson 274.555 (smaller solar elliptic with speed ~30.0°/h).
 *
 * Note: Generated only in shallow water; very small amplitude (<0.05 cm typical).
 * Usually negligible except in extreme shallow-water environments.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("R3", [{ constituent: R2, factor: 1.5 }]);
