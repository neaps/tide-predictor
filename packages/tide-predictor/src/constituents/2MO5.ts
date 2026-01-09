import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import O1 from "./O1.js";

/**
 * Shallow-water fifth-diurnal from M2-O1 interaction.
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
