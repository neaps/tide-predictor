import { defineCompoundConstituent } from "./index.js";
import N2 from "./N2.js";

/**
 * Second overtide of N2; shallow-water quarter-diurnal harmonic.
 * Amplitude ranges 0.25 to 2.25 times mean due to 18.613-year lunar node cycle.
 *
 * Note: Shallow-water constituent, typically found in tide predictions for coastal areas.
 */
export default defineCompoundConstituent("N4", [{ constituent: N2, factor: 2 }]);
