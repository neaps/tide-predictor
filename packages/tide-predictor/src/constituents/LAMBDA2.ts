import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar semi-diurnal (λ2, lambda2).
 * Lunar semi-diurnal constituent from Moon's perigee effects.
 * Amplitude typically <5% of M2; important in detailed constituent analysis.
 * IHO standard designation (previously abbreviated as LAM2).
 */
export default defineConstituent("LAMBDA2", [2, 1, -2, 1, 0, 0, 2], nc.uM2, nc.fM2);
