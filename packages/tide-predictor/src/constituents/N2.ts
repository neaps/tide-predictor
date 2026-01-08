import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal (N2).
 * Doodson Number: 2.-1.0.1.0.0.0
 * Speed 28.439°/h with period ~12.66 hours (lunar elliptic semi-diurnal).
 * Primary lunar elliptic semi-diurnal constituent from Moon's orbital variations.
 * Uses M2 nodal factors (fM2/uM2) for amplitude and phase modulation.
 * Nodal factor ranges: f from ~0.4 to ~1.6; u varies over 18.613-year cycle.
 * Amplitude typically 5-15% of M2; third-largest semi-diurnal constituent.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("N2", [2, -1, 0, 1, 0, 0, 0], nc.uM2, nc.fM2);
