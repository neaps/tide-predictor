import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal (L2).
 * Doodson Number: 2.1.0.-1.0.0.2
 * Speed 29.528°/h with period ~12.19 hours (lunar elliptic semi-diurnal).
 * Secondary lunar elliptic semi-diurnal from Moon's orbital variations and perigee effects.
 * Uses L2-specific nodal factors (fL2/uL2).
 * Amplitude typically 1-3% of M2; often grouped with other lunar elliptic constituents.
 * Important in detailed harmonic analyses of semi-diurnal tides.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("L2", [2, 1, 0, -1, 0, 0, 2], nc.uL2, nc.fL2);
