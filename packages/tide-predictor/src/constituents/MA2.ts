import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar variational semi-diurnal constituent (μ2, mu2).
 * Derived from Moon's orbital parameter variations.
 *
 * Note: Often included with M2 family in modern analysis. Minor constituent with
 * location-dependent amplitude.
 */
export default defineConstituent("MA2", [2, 0, -1, 0, 0, 0, 0], nc.uM2, nc.fM2);
