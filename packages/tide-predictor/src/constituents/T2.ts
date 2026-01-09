import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Solar elliptic semi-diurnal (T2).
 * Larger solar elliptic semi-diurnal constituent from solar declination effects.
 * Amplitude typically <5% of S2; increases at higher latitudes.
 * Forms part of solar semi-diurnal analysis alongside S2 and R2.
 */
export default defineConstituent("T2", [2, 2, -3, 0, 0, 1, 0], nc.uZero, nc.fUnity);
