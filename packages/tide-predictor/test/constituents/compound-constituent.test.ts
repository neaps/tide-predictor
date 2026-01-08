import { describe, it, expect } from "vitest";
import { defineCompoundConstituent } from "../../src/constituents/index.js";
import { defineConstituent } from "../../src/constituents/index.js";
import astro from "../../src/astronomy/index.js";

const sampleTime = new Date("2019-10-04T10:15:40.010Z");
const testAstro = astro(sampleTime);

// This is a made-up doodson number for a test coefficient
const testConstituentA = defineConstituent("testa", [1, 1, -1, 0, 0, 0, 1]);
const testConstituentB = defineConstituent("testb", [0, 1, -1, 0, 0, 0, 1]);

const compoundTest = defineCompoundConstituent("test compound", [
  { constituent: testConstituentA, factor: 1 },
  { constituent: testConstituentB, factor: -1 },
]);
describe("compound constituent", () => {
  it("it calculates compound coefficients", () => {
    expect(compoundTest.coefficients).toEqual([1, 0, 0, 0, 0, 0, 0]);
  });

  it("it calculates speed", () => {
    expect(compoundTest.speed(testAstro)).toBeCloseTo(14.4920521208, 4);
  });

  it("it calculates value", () => {
    expect(compoundTest.value(testAstro)).toBeCloseTo(268.504355062, 4);
  });

  it("it returns u correctly", () => {
    expect(compoundTest.u(testAstro)).toBe(0);
  });

  it("it returns f correctly", () => {
    expect(compoundTest.f(testAstro)).toBe(1);
  });
});
