import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal (NU2).
 * Doodson Number: 2.-1.2.-1.0.0.0
 * Speed 28.512°/h with period ~12.63 hours (lunar elliptic semi-diurnal).
 * Secondary lunar elliptic semi-diurnal from Moon's orbital variations.
 * Uses M2 nodal factors (fM2/uM2) for amplitude and phase modulation.
 * Amplitude typically 2-5% of M2; smaller than N2.
 * Important in detailed semi-diurnal constituent analysis.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("NU2", [2, -1, 2, -1, 0, 0, 0], nc.uM2, nc.fM2);
