import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Solar diurnal (P1).
 * Principal solar diurnal constituent; one-per-solar-day oscillation.
 * Amplitude typically 1/3 of K1; varies with latitude.
 * Forms key component of diurnal tidal analysis alongside K1 and O1.
 */
export default defineConstituent("P1", [1, 1, -2, 0, 0, 0, 1], nc.uZero, nc.fUnity);
