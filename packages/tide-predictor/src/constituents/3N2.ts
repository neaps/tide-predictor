import { defineCompoundConstituent } from "./index.js";
import N2 from "./N2.js";

/**
 * Triple N2 shallow-water harmonic (3 × N2).
 * Doodson Number: ~336 (estimated; not standard Doodson notation)
 * Speed 85.32°/h (≈ 3 × 28.44°/h) with period ~4.23 hours.
 * Nodal factor: (fN2)³ / (uN2)³ = cubic N2 nodal modulation.
 *
 * Note: Shallow-water constituent with definition based on compound frequency estimates.
 * Typical amplitude <0.5 cm; often <0.1 cm except in extreme shallow-water or enclosed basins.
 * Rarely significant in routine tide predictions.
 *
 * @see NOAA CO-OPS shallow-water constituents
 */
export default defineCompoundConstituent("3N2", [{ constituent: N2, factor: 3 }]);
