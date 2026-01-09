import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal elliptic (M1).
 * Secondary lunar diurnal constituent from Moon's elliptical orbit.
 * Typically very small amplitude; usually <1% of O1.
 * Rarely significant except in detailed harmonic analyses.
 */
export default defineConstituent("M1", [1, 0, 0, 0, 0, 0, 1], nc.uM1, nc.fM1);
