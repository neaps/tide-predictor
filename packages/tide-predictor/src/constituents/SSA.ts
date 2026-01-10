import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Solar semi-annual (Ssa).
 * Semi-annual constituent from solar declination with twice-yearly periodicity.
 */
export default defineConstituent(["Ssa", "SSA"], [0, 0, 2, 0, 0, 0, 0], nc.uZero, nc.fUnity);
