import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import S2 from "./S2.js";
import K1 from "./K1.js";

/**
 * Lunar-solar interaction compound constituent.
 * Doodson Number: 254.658 (or ~255 variant)
 * Speed ~28.5°/h; Uses fK1/uK1 nodal corrections.
 *
 * Warning: Non-standard constituent not in IHO or modern NOAA standard tables.
 * Definition varies significantly across sources. Rarely used in modern tide prediction.
 * Appears in Schureman's tables as variant shallow-water interaction.
 *
 * @see NOAA CO-OPS shallow-water constituents
 * @see Schureman shallow-water analysis tables
 */
export default defineCompoundConstituent("MSQM", [
  { constituent: M2, factor: 1 },
  { constituent: S2, factor: 1 },
  { constituent: K1, factor: 1 },
]);
