import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar fortnightly (MF).
 * Doodson Number: 020
 * Speed 1.098°/h (one cycle per lunar fortnight = 13.66 days).
 * Long-period constituent from lunar inequality interactions.
 * Uses fMf/uMf nodal factors related to lunar node position (18.613-year cycle).
 * Significant in long-term water level records and coastal resonances.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("MF", [0, 2, 0, 0, 0, 0, 0], nc.uMf, nc.fMf);
