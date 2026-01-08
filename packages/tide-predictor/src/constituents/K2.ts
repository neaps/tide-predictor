import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunisolar semi-diurnal (K2).
 * Doodson Number: 2.2.0.0.0.0.0
 * Speed 30.082°/h with period ~11.97 hours (lunisolar semi-diurnal).
 * Combined lunar and solar semi-diurnal constituent from declination effects.
 * Uses K2-specific nodal factors (fK2/uK2).
 * Amplitude typically 10-30% of S2; second-largest solar-related semi-diurnal component.
 * Important in semi-diurnal tidal analysis, especially at mid-latitudes.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("K2", [2, 2, 0, 0, 0, 0, 0], nc.uK2, nc.fK2);
