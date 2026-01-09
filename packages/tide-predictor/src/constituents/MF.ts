import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar fortnightly (MF).
 * Long-period constituent from lunar inequality interactions.
 * Significant in long-term water level records and coastal resonances.
 */
export default defineConstituent("MF", [0, 2, 0, 0, 0, 0, 0], nc.uMf, nc.fMf);
