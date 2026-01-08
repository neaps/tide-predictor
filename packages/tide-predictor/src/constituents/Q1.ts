import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Elliptic lunar diurnal (Q1).
 * Doodson Number: 1.-2.0.1.0.0.1
 * Speed 13.398°/h with period ~26.87 hours (lunar elliptic diurnal).
 * One solar day and one lunar day modulation interaction.
 * Uses O1 nodal factors (fO1/uO1) related to lunar node position.
 * Amplitude typically 2-5% of O1; important in diurnal constituent analysis.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("Q1", [1, -2, 0, 1, 0, 0, 1], nc.uO1, nc.fO1);
