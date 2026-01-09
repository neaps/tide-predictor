import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal (L2).
 * Secondary lunar elliptic semi-diurnal from Moon's orbital variations and perigee effects.
 * Amplitude typically 1-3% of M2; often grouped with other lunar elliptic constituents.
 * Important in detailed harmonic analyses of semi-diurnal tides.
 */
export default defineConstituent("L2", [2, 1, 0, -1, 0, 0, 2], nc.uL2, nc.fL2);
