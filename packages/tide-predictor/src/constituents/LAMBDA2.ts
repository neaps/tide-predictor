import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar semi-diurnal (λ2, lambda2).
 * Doodson Number: 2.1.-2.1.0.0.2
 * Speed 29.455°/h with period ~12.22 hours (lunar semi-diurnal).
 * Lunar semi-diurnal constituent from Moon's perigee effects.
 * Uses M2 nodal factors (fM2/uM2) for amplitude and phase modulation.
 * Amplitude typically <5% of M2; important in detailed constituent analysis.
 * IHO standard designation (previously abbreviated as LAM2).
 *
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 */
export default defineConstituent("LAMBDA2", [2, 1, -2, 1, 0, 0, 2], nc.uM2, nc.fM2);
