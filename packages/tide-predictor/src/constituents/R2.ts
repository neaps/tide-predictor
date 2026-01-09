import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Solar elliptic semi-diurnal (R2).
 * Smaller solar elliptic semi-diurnal constituent from solar declination effects.
 * Amplitude typically <2% of S2; smallest of the solar semi-diurnal group.
 * Rarely significant except in very detailed analyses.
 */
export default defineConstituent("R2", [2, 2, -1, 0, 0, -1, 2], nc.uZero, nc.fUnity);
