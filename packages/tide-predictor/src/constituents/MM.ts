import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar monthly (MM).
 * Doodson Number: 010.-10
 * Speed 0.544°/h (one cycle per lunar month = 27.55 days).
 * Long-period constituent from lunar declination variations.
 * Uses fMm/uMm nodal factors related to lunar orbital variations.
 * Important for long-term water level studies.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("MM", [0, 1, 0, -1, 0, 0, 0], nc.uZero, nc.fMm);
