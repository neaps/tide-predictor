import { describe, it, expect } from "vitest";
import constituents from "../../src/constituents/index.js";
import astro from "../../src/astronomy/index.js";

const sampleTime = new Date("2019-10-04T10:15:40.010Z");
const testAstro = astro(sampleTime);

describe("Base constituent definitions", () => {
  it("it prepared constituent SA", () => {
    expect(constituents.SA.value(testAstro)).toBeCloseTo(192.826398978, 4);
  });

  it("it prepared constituent SSA", () => {
    expect(constituents.SSA.value(testAstro)).toBeCloseTo(385.652797955, 4);
  });

  it("it prepared constituent M2", () => {
    expect(constituents.M2.value(testAstro)).toBeCloseTo(537.008710124, 4);
    expect(constituents.M2.u(testAstro)).toBeCloseTo(-2.07725095711, 4);
    expect(constituents.M2.f(testAstro)).toBeCloseTo(1.00853563237, 4);
  });

  it("has a correct lambda for M3", () => {
    expect(constituents.M3.u(testAstro)).toBeCloseTo(-3.11587643567, 4);
    expect(constituents.M3.f(testAstro)).toBeCloseTo(1.01283073119, 4);
  });
});
