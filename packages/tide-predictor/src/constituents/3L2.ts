import { defineCompoundConstituent } from "./definition.js";
import L2 from "./L2.js";

/**
 * Triple lunar elliptic; 3 times L2 interaction.
 *
 * Warning: Not in standard IHO constituent bank. Mainly historical/theoretical interest.
 * Very small amplitude (<0.1 cm); found only in extreme shallow water or enclosed basins.
 * Often ignored in routine tide predictions.
 *
 * @see Schureman, P. (1958). Manual of Harmonic Analysis and Prediction of Tides
 */
export default defineCompoundConstituent("3L2", [{ constituent: L2, factor: 3 }]);
