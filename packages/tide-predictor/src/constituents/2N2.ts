import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar semi-diurnal (2N2).
 * Doodson Number: 2.-2.0.2.0.0.0
 * Speed 27.895°/h with period ~12.91 hours (lunar semi-diurnal).
 * Second-order lunar semi-diurnal from Moon's orbital ellipticity.
 * Uses M2 nodal factors (fM2/uM2) for amplitude and phase modulation.
 * Nodal factor ranges: f from ~0.4 to ~1.6; u from 0° to ±180°.
 * Amplitude typically 5-10% of M2; significant in semi-diurnal analysis.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("2N2", [2, -2, 0, 2, 0, 0, 0], nc.uM2, nc.fM2);
