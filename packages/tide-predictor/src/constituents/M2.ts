import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar semi-diurnal (M2).
 * Primary principal lunar constituent; largest semi-diurnal tidal component globally.
 * Amplitude varies 10-20% over lunar node cycle; typically 0.2-0.5m in coastal areas.
 * Base constituent for many compound shallow-water constituents.
 */
export default defineConstituent("M2", [2, 0, 0, 0, 0, 0, 0], nc.uM2, nc.fM2);
