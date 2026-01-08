import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Mean sea level (Z0).
 * Doodson Number: 000.000
 * Not a tidal constituent in the strict sense, but represents the mean sea level offset
 * or the "zero" reference level used in tidal predictions.
 * No astronomical forcing; typically determined from harmonic analysis of observed data.
 * No nodal corrections applied (constant offset).
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("Z0", [0, 0, 0, 0, 0, 0, 0], nc.uZero, nc.fUnity);
