import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal (O1).
 * Primary lunar diurnal constituent; one-per-lunar-day oscillation.
 * Amplitude varies 10-20% due to lunar node effects.
 */
export default defineConstituent("O1", [1, -1, 0, 0, 0, 0, 1], nc.uO1, nc.fO1);
