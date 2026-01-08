import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar elliptic semi-diurnal (T2).
 * Doodson Number: 2.2.-3.0.0.1.0
 * Speed 29.959°/h with period ~12.01 hours (solar elliptic semi-diurnal).
 * Larger solar elliptic semi-diurnal constituent from solar declination effects.
 * No nodal corrections (solar constituent).
 * Amplitude typically <5% of S2; increases at higher latitudes.
 * Forms part of solar semi-diurnal analysis alongside S2 and R2.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("T2", [2, 2, -3, 0, 0, 1, 0], nc.uZero, nc.fUnity);
