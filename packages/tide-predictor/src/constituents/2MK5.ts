import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import K1 from "./K1.js";

/**
 * Shallow-water fifth-diurnal from M2-K1 interaction.
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
