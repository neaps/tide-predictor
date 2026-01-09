import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal (N2).
 * Primary lunar elliptic semi-diurnal constituent from Moon's orbital variations.
 * Amplitude typically 5-15% of M2; third-largest semi-diurnal constituent.
 */
export default defineConstituent("N2", [2, -1, 0, 1, 0, 0, 0], nc.uM2, nc.fM2);
