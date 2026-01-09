import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunisolar diurnal (K1).
 * Combined lunar and solar diurnal constituent; strongest diurnal tide in many regions.
 * Often comparable in amplitude to O1; amplitude ratio K1/O1 varies with latitude.
 */
export default defineConstituent("K1", [1, 1, 0, 0, 0, 0, -1], nc.uK1, nc.fK1);
