import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunar elliptic constituent from parameter variations.
 * Doodson Number: ~565.555
 * Speed ~27.9°/h with period ~12.9 hours.
 * Uses M2 nodal factors (fM2/uM2).
 *
 * From https://iho.int/mtg_docs/com_wg/IHOTC/IHOTC_Misc/TWCWG_Constituent_list.pdf:
 *
 * > MB2 was originally called Ma2 but this became ambiguous when spoken, or typed on
 * > computers without lower case, and so it was initially changed to MA2*. However, this
 * > in turn was thought to be clumsy and hence MB2 was finally adopted. Although
 * > theoretically they should have the same values of u and f as M2, they are so small
 * > that they are commonly treated as having values of u = 0 and f = 1.
 *
 * @see Schureman, P. (1958). Manual of Harmonic Analysis and Prediction of Tides
 */
export default defineConstituent("MB2", [2, 0, 1, 0, 0, 0, 0], nc.uM2, nc.fM2);
