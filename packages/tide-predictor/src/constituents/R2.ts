import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar elliptic semi-diurnal (R2).
 * Doodson Number: 2.2.-1.0.0.-1.2
 * Speed 30.041°/h with period ~11.98 hours (solar elliptic semi-diurnal).
 * Smaller solar elliptic semi-diurnal constituent from solar declination effects.
 * No nodal corrections (solar constituent).
 * Amplitude typically <2% of S2; smallest of the solar semi-diurnal group.
 * Rarely significant except in very detailed analyses.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("R2", [2, 2, -1, 0, 0, -1, 2], nc.uZero, nc.fUnity);
