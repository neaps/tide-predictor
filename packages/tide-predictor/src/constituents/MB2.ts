import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic constituent from parameter variations.
 * Doodson Number: ~237 (lunar parameter variant)
 * Speed ~27.9°/h with period ~12.9 hours.
 * Uses M2 nodal factors (fM2/uM2).
 *
 * Warning: Not consistently defined across all sources; may be regional or application-specific.
 * Definition and amplitude vary significantly between NOAA, IHO, and Schureman references.
 *
 * @see Schureman, P. (1958). Manual of Harmonic Analysis and Prediction of Tides
 */
export default defineConstituent("MB2", [2, -2, 2, 0, 0, 0, 0], nc.uM2, nc.fM2);
