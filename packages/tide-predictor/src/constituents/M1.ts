import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal elliptic (M1).
 * Doodson Number: 1.0.0.0.0.0.1
 * Speed 14.496°/h with period ~24.00 hours (lunar diurnal elliptic).
 * Secondary lunar diurnal constituent from Moon's elliptical orbit.
 * Uses M1-specific nodal factors (fM1/uM1).
 * Typically very small amplitude; usually <1% of O1.
 * Rarely significant except in detailed harmonic analyses.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("M1", [1, 0, 0, 0, 0, 0, 1], nc.uM1, nc.fM1);
