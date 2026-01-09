import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal (OO1).
 * Second-order lunar diurnal constituent from Moon's orbital eccentricity.
 * Typically very small amplitude; <2% of O1 in most locations.
 * Important for detailed harmonic analysis in some regions.
 */
export default defineConstituent("OO1", [1, 3, 0, 0, 0, 0, -1], nc.uOO1, nc.fOO1);
