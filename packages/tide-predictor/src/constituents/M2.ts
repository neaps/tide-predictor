import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar semi-diurnal (M2).
 * Doodson Number: 2.0.0.0.0.0.0
 * Speed 28.984°/h with period exactly 12.4206 hours (mean lunar semi-diurnal).
 * Primary principal lunar constituent; largest semi-diurnal tidal component globally.
 * Uses M2 nodal factors (fM2/uM2) with 18.613-year lunar ascending node cycle.
 * Nodal factor ranges: f from ~0.4 to ~1.6; u from 0° to ±180°.
 * Amplitude varies 10-20% over lunar node cycle; typically 0.2-0.5m in coastal areas.
 * Base constituent for many compound shallow-water constituents.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("M2", [2, 0, 0, 0, 0, 0, 0], nc.uM2, nc.fM2);
