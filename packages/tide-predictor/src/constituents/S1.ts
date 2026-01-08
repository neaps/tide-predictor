import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar diurnal (S1).
 * Doodson Number: 1.1.-1.0.0.0.0
 * Speed 15.000°/h with period 24.00 hours exactly (solar diurnal).
 * Secondary solar diurnal constituent related to solar declination inequality.
 * No nodal corrections (solar constituent).
 * Usually very small amplitude; typically dominated by K1 and P1 in diurnal analysis.
 * Rarely included in routine harmonic analyses.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("S1", [1, 1, -1, 0, 0, 0, 0], nc.uZero, nc.fUnity);
