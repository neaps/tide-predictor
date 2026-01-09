import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunisolar semi-diurnal (K2).
 * Combined lunar and solar semi-diurnal constituent from declination effects.
 * Amplitude typically 10-30% of S2; second-largest solar-related semi-diurnal component.
 * Important in semi-diurnal tidal analysis, especially at mid-latitudes.
 */
export default defineConstituent("K2", [2, 2, 0, 0, 0, 0, 0], nc.uK2, nc.fK2);
