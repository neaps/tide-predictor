import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar annual (Sa).
 * Doodson Number: 001.000
 * Speed 0.041°/h (one cycle per solar year = 365.24 days).
 * Long-term constituent driven by solar declination variations over the year.
 * No nodal corrections (solar constituent).
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("Sa", [0, 0, 1, 0, 0, 0, 0], nc.uZero, nc.fUnity);
