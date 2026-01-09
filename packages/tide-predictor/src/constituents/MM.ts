import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar monthly (MM).
 * Long-period constituent from lunar declination variations.
 * Important for long-term water level studies.
 */
export default defineConstituent("MM", [0, 1, 0, -1, 0, 0, 0], nc.uZero, nc.fMm);
