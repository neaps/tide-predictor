import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic semi-diurnal constituent (ε2).
 */
export default defineConstituent("EP2", [2, -3, 2, 1, 0, 0, 0], nc.uM2, nc.fM2);
