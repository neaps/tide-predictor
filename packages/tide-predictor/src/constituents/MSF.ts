import { defineCompoundConstituent } from "./definition.js";
import S2 from "./S2.js";
import M2 from "./M2.js";

/**
 * Lunisolar synodic fortnightly (MSF = S2-M2).
 * Long-period constituent representing beat frequency between solar S2 and lunar M2.
 * Manifests as fortnightly modulation of tidal range (spring-neap cycle).
 * Amplitude typically 5-15% of M2; represents the primary spring-neap variation.
 * Important for tidal range predictions and coastal flooding assessments.
 */
export default defineCompoundConstituent("MSF", [
  { constituent: S2, factor: 1 },
  { constituent: M2, factor: -1 },
]);
