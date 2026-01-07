import nodeCorrections from "../node-corrections/index.js";
import type { AstroData } from "../astronomy/index.js";
import type { NodeCorrectionFunction } from "../node-corrections/index.js";

/**
 * Computes the dot notation of two arrays
 */
const dotArray = (a: number[], b: number[]): number => {
  const results: number[] = [];
  a.forEach((value, index) => {
    results.push(value * b[index]);
  });
  return results.reduce((total, value) => total + value);
};

const astronimicDoodsonNumber = (astro: AstroData): AstroData[keyof AstroData][] => {
  return [astro["T+h-s"], astro.s, astro.h, astro.p, astro.N, astro.pp, astro["90"]];
};

const astronomicSpeed = (astro: AstroData): number[] => {
  const results: number[] = [];
  astronimicDoodsonNumber(astro).forEach((number) => {
    results.push(number.speed);
  });
  return results;
};

const astronomicValues = (astro: AstroData): number[] => {
  const results: number[] = [];
  astronimicDoodsonNumber(astro).forEach((number) => {
    results.push(number.value);
  });
  return results;
};

export interface Constituent {
  name: string;
  coefficients: number[];
  value: (astro: AstroData) => number;
  speed: (astro: AstroData) => number;
  u: NodeCorrectionFunction;
  f: NodeCorrectionFunction;
}

const constituentFactory = (
  name: string,
  coefficients: number[],
  u?: NodeCorrectionFunction,
  f?: NodeCorrectionFunction,
): Constituent => {
  if (!coefficients) {
    throw new Error("Coefficient must be defined for a constituent");
  }

  const constituent: Constituent = {
    name,
    coefficients,

    value: (astro: AstroData): number => {
      return dotArray(coefficients, astronomicValues(astro));
    },

    speed(astro: AstroData): number {
      return dotArray(coefficients, astronomicSpeed(astro));
    },

    u: typeof u !== "undefined" ? u : nodeCorrections.uZero,

    f: typeof f !== "undefined" ? f : nodeCorrections.fUnity,
  };

  return Object.freeze(constituent);
};

export default constituentFactory;
export { astronimicDoodsonNumber, astronomicSpeed, astronomicValues };
