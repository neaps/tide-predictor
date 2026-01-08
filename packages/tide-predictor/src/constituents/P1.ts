import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar diurnal (P1).
 * Doodson Number: 1.1.-2.0.0.0.1
 * Speed 14.959°/h with period ~24.07 hours (solar diurnal).
 * Principal solar diurnal constituent; one-per-solar-day oscillation.
 * No nodal corrections (solar constituent; invariant in time).
 * Amplitude typically 1/3 of K1; varies with latitude.
 * Forms key component of diurnal tidal analysis alongside K1 and O1.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("P1", [1, 1, -2, 0, 0, 0, 1], nc.uZero, nc.fUnity);
