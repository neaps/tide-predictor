import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal variational constituent (σ1, sigma1).
 * Doodson Number: 127.555
 * Derived from Moon's declination variations; speed 12.73°/h with period ~28.3 hours.
 * Uses K1 nodal factors (fK1/uK1) for amplitude and phase modulation.
 *
 * Note: Often has small amplitude; closely related to K1 and O1 variations.
 *
 * @see https://iho.int/en/standards-and-specifications/standards/s-14 IHO Tidal Constituent Bank
 */
export default defineConstituent("SGM", [1, -3, 2, 0, 0, 0, 0], nc.uK1, nc.fK1);
