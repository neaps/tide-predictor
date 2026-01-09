import { defineConstituent } from "./definition.js";
import nc from "../node-corrections/index.js";

/**
 * Solar semi-diurnal (S2).
 * Principal solar semi-diurnal constituent; largest solar tide component.
 * Amplitude typically 20-50% of M2; varies with geographic location and latitude.
 * Ratio M2/S2 determines tidal form factor (diurnal vs semi-diurnal regimes).
 * Base constituent for many compound shallow-water constituents.
 */
export default defineConstituent("S2", [2, 2, -2, 0, 0, 0, 0], nc.uZero, nc.fUnity);
