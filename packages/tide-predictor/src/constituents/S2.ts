import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Solar semi-diurnal (S2).
 * Doodson Number: 2.2.-2.0.0.0.0
 * Speed 30.000°/h with period exactly 12.00 hours (principal solar semi-diurnal).
 * Principal solar semi-diurnal constituent; largest solar tide component.
 * No nodal corrections (solar constituent; invariant in time).
 * Amplitude typically 20-50% of M2; varies with geographic location and latitude.
 * Ratio M2/S2 determines tidal form factor (diurnal vs semi-diurnal regimes).
 * Base constituent for many compound shallow-water constituents.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("S2", [2, 2, -2, 0, 0, 0, 0], nc.uZero, nc.fUnity);
