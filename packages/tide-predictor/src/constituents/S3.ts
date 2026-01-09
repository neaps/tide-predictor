import { defineCompoundConstituent } from "./definition.js";
import S2 from "./S2.js";

/**
 * Solar terdiurnal overtide; shallow-water only.
 *
 * Note: Generated only in shallow water; not found in deep ocean.
 * Typical amplitude <1 cm except in extreme shallow-water environments.
 *
 * @see NOAA CO-OPS
 */
export default defineCompoundConstituent("S3", [{ constituent: S2, factor: 1.5 }]);
