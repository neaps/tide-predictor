import { defineCompoundConstituent } from "./index.js";
import N2 from "./N2.js";

/**
 * Triple N2 shallow-water harmonic (3 × N2).
 *
 * Note: Shallow-water constituent with definition based on compound frequency estimates.
 * Typical amplitude <0.5 cm; often <0.1 cm except in extreme shallow-water or enclosed basins.
 * Rarely significant in routine tide predictions.
 *
 * @see NOAA CO-OPS shallow-water constituents
 */
export default defineCompoundConstituent("3N2", [{ constituent: N2, factor: 3 }]);
