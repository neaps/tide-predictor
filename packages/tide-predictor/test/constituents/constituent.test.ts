import { describe, it, expect } from "vitest";
import constituent, {
  astronimicDoodsonNumber,
  astronomicSpeed,
  astronomicValues,
} from "../../src/constituents/constituent.js";
import astro from "../../src/astronomy/index.js";

const sampleTime = new Date("2019-10-04T10:15:40.010Z");
const testAstro = astro(sampleTime);

// This is a made-up doodson number for a test coefficient
const testConstituent = constituent("test", [1, 1, -1, 0, 0, 0, 1]);

describe("constituent", () => {
  it("it throws error if missing coefficients", () => {
    expect(() => {
      // @ts-expect-error: Testing invalid input
      constituent("fail");
    }).toThrow("Coefficient must be defined for a constituent");
  });

  it("it fetches astronimic Doodson Number values", () => {
    const values = astronimicDoodsonNumber(testAstro);
    expect(values[0].value).toBe(testAstro["T+h-s"].value);
  });

  it("it fetches astronimic speed", () => {
    const values = astronomicSpeed(testAstro);
    expect(values[0]).toBe(testAstro["T+h-s"].speed);
  });

  it("it fetches astronimic values", () => {
    const values = astronomicValues(testAstro);
    expect(values[0]).toBe(testAstro["T+h-s"].value);
  });

  it("it computes constituent value", () => {
    expect(testConstituent.value(testAstro)).toBeCloseTo(423.916666657, 4);
  });

  it("it computes constituent speed", () => {
    expect(testConstituent.speed(testAstro)).toBe(15);
  });

  it("it returns u correctly", () => {
    expect(testConstituent.u(testAstro)).toBe(0);
  });

  it("it returns f correctly", () => {
    expect(testConstituent.f(testAstro)).toBe(1);
  });
});
