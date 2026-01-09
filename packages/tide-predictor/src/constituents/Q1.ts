import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Elliptic lunar diurnal (Q1).
 * One solar day and one lunar day modulation interaction.
 * Amplitude typically 2-5% of O1; important in diurnal constituent analysis.
 */
export default defineConstituent("Q1", [1, -2, 0, 1, 0, 0, 1], nc.uO1, nc.fO1);
