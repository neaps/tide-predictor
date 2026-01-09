import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Mean sea level (Z0).
 * Not a tidal constituent in the strict sense, but represents the mean sea level offset
 * or the "zero" reference level used in tidal predictions.
 * No astronomical forcing; typically determined from harmonic analysis of observed data.
 */
export default defineConstituent("Z0", [0, 0, 0, 0, 0, 0, 0], nc.uZero, nc.fUnity);
