import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar diurnal variational constituent (σ1, sigma1).
 * Derived from Moon's declination variations.
 *
 * Note: Often has small amplitude; closely related to K1 and O1 variations.
 */
export default defineConstituent("SGM", [1, -3, 2, 0, 0, 0, -1], nc.uO1, nc.fO1);
