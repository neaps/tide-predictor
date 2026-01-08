import { defineCompoundConstituent } from "./index.js";
import N2 from "./N2.js";

/**
 * Second overtide of N2; shallow-water quarter-diurnal harmonic.
 * Doodson Number: 445.655
 * Speed 56.88°/h (= 2 × N2 speed) with period ~6.27 hours.
 * Nodal factor: (fN2)² / (uN2)² = squared N2 nodal modulation.
 * Amplitude ranges 0.25 to 2.25 times mean due to 18.613-year lunar node cycle.
 *
 * Note: Shallow-water constituent, typically found in tide predictions for coastal areas.
 *
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 * @see https://en.wikipedia.org/wiki/Theory_of_tides
 */
export default defineCompoundConstituent("N4", [{ constituent: N2, factor: 2 }]);
