import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar variational semi-diurnal constituent (μ2, mu2).
 * Doodson Number: 237.555
 * Derived from Moon's orbital parameter variations; speed 27.968°/h with period ~12.87 hours.
 * Uses M2 nodal factors with complex variable modulation.
 *
 * Note: Often included with M2 family in modern analysis. Minor constituent with
 * location-dependent amplitude.
 *
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 */
export default defineConstituent("MA2", [2, -2, 2, 0, 0, 0, 0], nc.uM2, nc.fM2);
