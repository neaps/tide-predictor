import { defineCompoundConstituent } from "./index.js";
import M2 from "./M2.js";
import S2 from "./S2.js";

/**
 * Quarter-diurnal shallow-water interaction: 2×M2 + S2.
 * Doodson Number: 473.555
 * Speed 58.984°/h with period ~6.10 hours.
 * Nodal factor: f(M2)²(S2) / u(M2)²(S2) = combined M2² and S2 factors.
 *
 * Note: Sometimes denoted as MS4 in alternative notation systems.
 * Generated only in shallow water; typical amplitude 0.01-0.2 meters depending on depth.
 * Included in IHO shallow-water constituent tables and NOAA analysis (order #37).
 *
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 * @see https://en.wikipedia.org/wiki/Theory_of_tides
 */
export default defineCompoundConstituent("2MS6", [
  { constituent: M2, factor: 2 },
  { constituent: S2, factor: 1 },
]);
