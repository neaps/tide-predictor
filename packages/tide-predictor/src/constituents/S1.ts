import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar diurnal (S1).
 * Secondary solar diurnal constituent related to solar declination inequality.
 * Usually very small amplitude; typically dominated by K1 and P1 in diurnal analysis.
 * Rarely included in routine harmonic analyses.
 */
export default defineConstituent("S1", [1, 1, -1, 0, 0, 0, 0], nc.uZero, nc.fUnity);
