import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal (J1).
 * Shallow-water lunar diurnal constituent; generally much smaller than O1 and K1.
 * Typically important only in shallow-water systems and enclosed basins.
 * Amplitude usually <5% of O1; rarely significant in routine predictions.
 */
export default defineConstituent("J1", [1, 2, 0, -1, 0, 0, -1], nc.uJ1, nc.fJ1);
