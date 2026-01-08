import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import K1 from "./K1.js";

/**
 * Shallow-water quinte-diurnal from M2-K1 interaction.
 * Doodson Number: ~465.555 (estimated; compounded frequency)
 * Components: 2×M2 (lunar semi-diurnal × 2) + K1 (lunisolar diurnal).
 * Speed 44.025°/h with period ~8.18 hours.
 * Nodal factors combine (fM2)² with fK1.
 *
 * Note: Found in coastal tide predictions, especially in enclosed bays and harbors.
 * Amplitude typically 0.1-0.5 cm depending on location and water depth.
 * Shallow-water constituent only; not present in deep ocean.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("2MK5", [
  { constituent: M2, factor: 2 },
  { constituent: K1, factor: 1 },
]);
