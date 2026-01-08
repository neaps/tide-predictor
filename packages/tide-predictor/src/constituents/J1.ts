import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal (J1).
 * Doodson Number: 1.2.0.-1.0.0.-1
 * Speed 15.585°/h with period ~23.10 hours (lunar diurnal).
 * Shallow-water lunar diurnal constituent; generally much smaller than O1 and K1.
 * Uses J1-specific nodal factors (fJ1/uJ1).
 * Typically important only in shallow-water systems and enclosed basins.
 * Amplitude usually <5% of O1; rarely significant in routine predictions.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("J1", [1, 2, 0, -1, 0, 0, -1], nc.uJ1, nc.fJ1);
