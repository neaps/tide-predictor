import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal (O1).
 * Doodson Number: 1.-1.0.0.0.0.1
 * Speed 13.943°/h with period ~24.84 hours (lunar diurnal).
 * Primary lunar diurnal constituent; one-per-lunar-day oscillation.
 * Uses fO1/uO1 nodal factors related to lunar ascending node (18.613-year cycle).
 * Nodal factor ranges: f from ~0.4 to ~1.6; u from 0° to ±180°.
 * Amplitude varies 10-20% due to lunar node effects.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("O1", [1, -1, 0, 0, 0, 0, 1], nc.uO1, nc.fO1);
