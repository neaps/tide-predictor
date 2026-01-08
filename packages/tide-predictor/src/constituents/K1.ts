import { defineConstituent } from "./index.js";
import nc from "../node-corrections/index.js";

/**
 * Lunisolar diurnal (K1).
 * Doodson Number: 1.1.0.0.0.0.-1
 * Speed 15.041°/h with period ~23.93 hours (lunisolar diurnal).
 * Combined lunar and solar diurnal constituent; strongest diurnal tide in many regions.
 * Uses fK1/uK1 nodal factors related to lunar ascending node (18.613-year cycle).
 * Often comparable in amplitude to O1; amplitude ratio K1/O1 varies with latitude.
 * Nodal factor ranges: f from ~0.4 to ~1.6; u varies with lunar node phase.
 *
 * @see https://tidesandcurrents.noaa.gov/ NOAA CO-OPS
 */
export default defineConstituent("K1", [1, 1, 0, 0, 0, 0, -1], nc.uK1, nc.fK1);
