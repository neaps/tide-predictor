import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar terdiurnal (M3).
 * Doodson Number: 3.0.0.0.0.0.0
 * Speed 43.476°/h with period ~8.28 hours (lunar terdiurnal).
 * Third-diurnal lunar constituent from Moon's orbital motion.
 * Uses M3-specific nodal factors (uModd/fModd with factor 3).
 * Typically found in shallow water and resonant systems.
 * Amplitude usually <2% of M2; important in some shallow-water analyses.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
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
