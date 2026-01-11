import { defineCompoundConstituent } from "./definition.js";
import M2 from "./M2.js";
import P1 from "./P1.js";

/**
 * Solar-lunar diurnal (MP1 = M2 - P1).
 * Combined solar and lunar diurnal constituent from solar-lunar interaction.
 * Amplitude typically small; usually <5% of K1.
 * Rarely significant except in specialized harmonic analyses.
 */
export default defineCompoundConstituent("MP1", [
  { constituent: M2, factor: 1 },
  { constituent: P1, factor: -1 },
]);
