import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import O1 from "./O1.js";

/**
 * Shallow-water quinte-diurnal from M2-O1 interaction.
 * Doodson Number: ~445.555 (estimated; compounded frequency)
 * Components: 2×M2 (lunar semi-diurnal × 2) + O1 (lunar diurnal).
 * Speed 43.47°/h with period ~8.28 hours.
 * Nodal factors combine (fM2)² with fO1.
 *
 * Note: Primarily shallow-water coastal phenomenon, not present in deep ocean.
 * Amplitude typically <0.5 cm except in extreme shallow-water or enclosed basins.
 * Found in coastal tide predictions alongside other shallow-water constituents.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("2MO5", [
  { constituent: M2, factor: 2 },
  { constituent: O1, factor: 1 },
]);
