import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar semi-annual (Ssa).
 * Doodson Number: 002.000
 * Speed 0.0823°/h (one cycle per solar half-year = 182.6 days).
 * Semi-annual constituent from solar declination with twice-yearly periodicity.
 * No nodal corrections (solar constituent).
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("Ssa", [0, 0, 2, 0, 0, 0, 0], nc.uZero, nc.fUnity);
