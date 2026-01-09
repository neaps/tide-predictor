import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar terdiurnal (M3).
 * Third-diurnal lunar constituent from Moon's orbital motion.
 * Typically found in shallow water and resonant systems.
 * Amplitude usually <2% of M2; important in some shallow-water analyses.
 */
// Third diurnal
export default defineConstituent(
  "M3",
  [3, 0, 0, 0, 0, 0, 0],
  (a) => {
    return nc.uModd(a, 3);
  },
  (a) => {
    return nc.fModd(a, 3);
  },
);
