import { defineCompoundConstituent } from "./index.js";
import S2 from "./S2.js";
import M2 from "./M2.js";

/**
 * Lunisolar synodic fortnightly (MSF).
 * Compound constituent: S2-M2
 * Speed ~1.016°/h with period ~354.37 hours (~14.76 days, fortnightly).
 * Long-period constituent representing beat frequency between solar S2 and lunar M2.
 * Manifests as fortnightly modulation of tidal range (spring-neap cycle).
 * Nodal factor: fM2/fS2 with phase uS2-uM2.
 * Amplitude typically 5-15% of M2; represents the primary spring-neap variation.
 * Important for tidal range predictions and coastal flooding assessments.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineCompoundConstituent("MSF", [
  { constituent: S2, factor: 1 },
  { constituent: M2, factor: -1 },
]);
