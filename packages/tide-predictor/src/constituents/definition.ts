import type { AstroData } from "../astronomy/index.js";
import nodeCorrections, { type NodeCorrectionFunction } from "../node-corrections/index.js";

export interface Constituent {
  names: string[];
  coefficients: number[];
  value: (astro: AstroData) => number;
  speed: (astro: AstroData) => number;
  u: NodeCorrectionFunction;
  f: NodeCorrectionFunction;
}

export function defineConstituent(
  names: string | string[],
  coefficients: number[],
  u?: NodeCorrectionFunction,
  f?: NodeCorrectionFunction,
): Constituent {
  if (!coefficients) {
    throw new Error("Coefficient must be defined for a constituent");
  }

  return Object.freeze({
    names: Array.isArray(names) ? names : [names],

    coefficients,

    value: (astro: AstroData): number => {
      return dotArray(coefficients, astronomicValues(astro));
    },

    speed(astro: AstroData): number {
      return dotArray(coefficients, astronomicSpeed(astro));
    },

    u: typeof u !== "undefined" ? u : nodeCorrections.uZero,

    f: typeof f !== "undefined" ? f : nodeCorrections.fUnity,
  });
}

export interface ConstituentMember {
  constituent: Constituent;
  factor: number;
}

export function defineCompoundConstituent(
  names: string | string[],
  members: ConstituentMember[],
): Constituent {
  const coefficients: number[] = [];
  members.forEach(({ constituent, factor }) => {
    constituent.coefficients.forEach((coefficient, index) => {
      if (typeof coefficients[index] === "undefined") {
        coefficients[index] = 0;
      }
      coefficients[index] += coefficient * factor;
    });
  });

  return Object.freeze({
    names: Array.isArray(names) ? names : [names],
    coefficients,

    speed: (astro: AstroData): number => {
      let speed = 0;
      members.forEach(({ constituent, factor }) => {
        speed += constituent.speed(astro) * factor;
      });
      return speed;
    },

    value: (astro: AstroData): number => {
      let value = 0;
      members.forEach(({ constituent, factor }) => {
        value += constituent.value(astro) * factor;
      });
      return value;
    },

    u: (astro: AstroData): number => {
      let u = 0;
      members.forEach(({ constituent, factor }) => {
        u += constituent.u(astro) * factor;
      });
      return u;
    },

    f: (astro: AstroData): number => {
      const f: number[] = [];
      members.forEach(({ constituent, factor }) => {
        f.push(Math.pow(constituent.f(astro), Math.abs(factor)));
      });
      return f.reduce((previous, value) => previous * value);
    },
  });
}

/**
 * Computes the dot notation of two arrays
 */
function dotArray(a: number[], b: number[]): number {
  const results: number[] = [];
  a.forEach((value, index) => {
    results.push(value * b[index]);
  });
  return results.reduce((total, value) => total + value);
}

export function astronimicDoodsonNumber(astro: AstroData): AstroData[keyof AstroData][] {
  return [astro["T+h-s"], astro.s, astro.h, astro.p, astro.N, astro.pp, astro["90"]];
}

export function astronomicSpeed(astro: AstroData): number[] {
  const results: number[] = [];
  astronimicDoodsonNumber(astro).forEach((number) => {
    results.push(number.speed);
  });
  return results;
}

export function astronomicValues(astro: AstroData): number[] {
  const results: number[] = [];
  astronimicDoodsonNumber(astro).forEach((number) => {
    results.push(number.value);
  });
  return results;
}

// Silence TS warning for empty module
export default {};
