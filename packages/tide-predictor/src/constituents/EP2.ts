import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal constituent (ε2).
 * Doodson Number: 256.555
 * From Moon's elliptical orbit; speed 29.6°/h with period of ~12.0 hours.
 * Uses M2 nodal factors (fM2/uM2) for amplitude and phase modulation.
 *
 * Note: Sometimes called ν2 variant in some sources, but IHO designation is definitive.
 *
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS constituent tables
 * @see https://en.wikipedia.org/wiki/Theory_of_tides Theory of Tides
 */
export default defineConstituent("EP2", [2, 0, 1, 0, 0, 0, 0], nc.uM2, nc.fM2);
