import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar semi-diurnal (2N2).
 * Second-order lunar semi-diurnal from Moon's orbital ellipticity.
 * Amplitude typically 5-10% of M2; significant in semi-diurnal analysis.
 */
export default defineConstituent("2N2", [2, -2, 0, 2, 0, 0, 0], nc.uM2, nc.fM2);
