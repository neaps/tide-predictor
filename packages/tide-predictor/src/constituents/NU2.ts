import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal (NU2).
 * Secondary lunar elliptic semi-diurnal from Moon's orbital variations.
 * Amplitude typically 2-5% of M2; smaller than N2.
 * Important in detailed semi-diurnal constituent analysis.
 */
export default defineConstituent("NU2", [2, -1, 2, -1, 0, 0, 0], nc.uM2, nc.fM2);
