import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Solar annual (Sa).
 * Long-term constituent driven by solar declination variations over the year.
 */
export default defineConstituent(["SA", "Sa"], [0, 0, 1, 0, 0, 0, 0], nc.uZero, nc.fUnity);
