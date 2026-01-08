import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal (OO1).
 * Doodson Number: 1.3.0.0.0.0.-1
 * Speed 16.139°/h with period ~22.31 hours (lunar diurnal).
 * Second-order lunar diurnal constituent from Moon's orbital eccentricity.
 * Uses OO1-specific nodal factors (fOO1/uOO1).
 * Typically very small amplitude; <2% of O1 in most locations.
 * Important for detailed harmonic analysis in some regions.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("OO1", [1, 3, 0, 0, 0, 0, -1], nc.uOO1, nc.fOO1);
