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

  it("has correct properties for LAMBDA2 (alias of LAM2)", () => {
    // LAMBDA2: [2, 1, -2, 1, 0, 0, 2]
    // Speed: 2(T+h-s) + s - 2h + p ≈ 29.455626°/h
    expect(constituents.LAMBDA2).toBeDefined();
    expect(constituents.LAMBDA2.speed(testAstro)).toBeCloseTo(29.455626, 2);
    expect(constituents.LAMBDA2.u(testAstro)).toBeCloseTo(constituents.M2.u(testAstro), 2);
    expect(constituents.LAMBDA2.f(testAstro)).toBeCloseTo(constituents.M2.f(testAstro), 3);
  });

  it("has correct properties for RHO1 (alias of RHO)", () => {
    // RHO1 = NU2 - K1 (compound constituent)
    expect(constituents.RHO1).toBeDefined();
    const expectedSpeed = constituents.NU2.speed(testAstro) - constituents.K1.speed(testAstro);
    expect(constituents.RHO1.speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for EP2 (lunar elliptic semi-diurnal)", () => {
    // EP2: [2, 0, 1, 0, 0, 0, 0]
    // Speed: 2(T+h-s) + h ≈ 29.025°/h
    expect(constituents.EP2).toBeDefined();
    expect(constituents.EP2.speed(testAstro)).toBeCloseTo(29.025, 2);
    expect(constituents.EP2.u(testAstro)).toBeCloseTo(constituents.M2.u(testAstro), 2);
    expect(constituents.EP2.f(testAstro)).toBeCloseTo(constituents.M2.f(testAstro), 3);
  });

  it("has correct properties for MA2 (lunar variational semi-diurnal, mu2)", () => {
    // MA2: [2, 0, -2, 1, 0, 0, 0]
    // Speed: 2(T+h-s) - 2h + p ≈ 27.968208°/h
    expect(constituents.MA2).toBeDefined();
    expect(constituents.MA2.speed(testAstro)).toBeCloseTo(27.968208, 2);
    expect(constituents.MA2.u(testAstro)).toBeCloseTo(constituents.M2.u(testAstro), 2);
    expect(constituents.MA2.f(testAstro)).toBeCloseTo(constituents.M2.f(testAstro), 3);
  });

  it("has correct properties for MB2 (lunar elliptic parameter variation)", () => {
    // MB2: [2, 0, -3, 1, 0, 1, 0]
    // Speed: 2(T+h-s) - 3h + p + p' ≈ 27.968°/h
    expect(constituents.MB2).toBeDefined();
    expect(constituents.MB2.speed(testAstro)).toBeCloseTo(27.968, 2);
    expect(constituents.MB2.u(testAstro)).toBeCloseTo(constituents.M2.u(testAstro), 2);
    expect(constituents.MB2.f(testAstro)).toBeCloseTo(constituents.M2.f(testAstro), 3);
  });

  it("has correct properties for SGM (lunar diurnal variational, sigma1)", () => {
    // SGM: [1, -2, 0, 0, 0, 0, 1]
    // Speed: (T+h-s) - 2s + 90 ≈ 12.927°/h
    expect(constituents.SGM).toBeDefined();
    expect(constituents.SGM.speed(testAstro)).toBeCloseTo(12.927, 2);
    expect(constituents.SGM.u(testAstro)).toBeCloseTo(constituents.K1.u(testAstro), 2);
    expect(constituents.SGM.f(testAstro)).toBeCloseTo(constituents.K1.f(testAstro), 3);
  });

  // New shallow-water compound constituents
  it("has correct properties for MSQM (lunar-solar compound)", () => {
    // MSQM = M2 + S2 + K1
    expect(constituents.MSQM).toBeDefined();
    const expectedSpeed =
      constituents.M2.speed(testAstro) +
      constituents.S2.speed(testAstro) +
      constituents.K1.speed(testAstro);
    expect(constituents.MSQM.speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for MTM (lunar-solar M2-T2 interaction)", () => {
    // MTM = M2 + T2
    expect(constituents.MTM).toBeDefined();
    const expectedSpeed = constituents.M2.speed(testAstro) + constituents.T2.speed(testAstro);
    expect(constituents.MTM.speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for MKS2 (three-way M2-K1-S2 interaction)", () => {
    // MKS2 = M2 + K1 - S2
    expect(constituents.MKS2).toBeDefined();
    const expectedSpeed =
      constituents.M2.speed(testAstro) +
      constituents.K1.speed(testAstro) -
      constituents.S2.speed(testAstro);
    expect(constituents.MKS2.speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for N4 (N2 overtide)", () => {
    // N4 = 2 × N2
    expect(constituents.N4).toBeDefined();
    const expectedSpeed = 2 * constituents.N2.speed(testAstro);
    expect(constituents.N4.speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for S3 (solar terdiurnal)", () => {
    // S3 = 1.5 × S2 = 45.0°/h (fixed, no nodal modulation)
    expect(constituents.S3).toBeDefined();
    expect(constituents.S3.speed(testAstro)).toBeCloseTo(45.0, 2);
    expect(constituents.S3.f(testAstro)).toBeCloseTo(1.0, 3); // Solar, no nodal modulation
    expect(constituents.S3.u(testAstro)).toBeCloseTo(0.0, 3);
  });

  it("has correct properties for T3 (solar elliptic terdiurnal)", () => {
    // T3 = 1.5 × T2 ≈ 44.9364°/h
    expect(constituents.T3).toBeDefined();
    expect(constituents.T3.speed(testAstro)).toBeCloseTo(44.9364, 2);
    expect(constituents.T3.f(testAstro)).toBeCloseTo(1.0, 3); // Solar, no nodal modulation
    expect(constituents.T3.u(testAstro)).toBeCloseTo(0.0, 3);
  });

  it("has correct properties for R3 (solar elliptic terdiurnal)", () => {
    // R3 = 1.5 × R2 ≈ 45.062°/h
    expect(constituents.R3).toBeDefined();
    expect(constituents.R3.speed(testAstro)).toBeCloseTo(45.062, 2);
    expect(constituents.R3.f(testAstro)).toBeCloseTo(1.0, 3); // Solar, no nodal modulation
    expect(constituents.R3.u(testAstro)).toBeCloseTo(0.0, 3);
  });

  it("has correct properties for 3L2 (triple L2)", () => {
    // 3L2 = 3 × L2
    expect(constituents["3L2"]).toBeDefined();
    const expectedSpeed = 3 * constituents.L2.speed(testAstro);
    expect(constituents["3L2"].speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for 3N2 (triple N2)", () => {
    // 3N2 = 3 × N2
    expect(constituents["3N2"]).toBeDefined();
    const expectedSpeed = 3 * constituents.N2.speed(testAstro);
    expect(constituents["3N2"].speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for 2MS6 (quarter-diurnal M2-S2 interaction)", () => {
    // 2MS6 = 2 × M2 + S2
    expect(constituents["2MS6"]).toBeDefined();
    const expectedSpeed = 2 * constituents.M2.speed(testAstro) + constituents.S2.speed(testAstro);
    expect(constituents["2MS6"].speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for 2MK5 (quinte-diurnal M2-K1 interaction)", () => {
    // 2MK5 = 2 × M2 + K1
    expect(constituents["2MK5"]).toBeDefined();
    const expectedSpeed = 2 * constituents.M2.speed(testAstro) + constituents.K1.speed(testAstro);
    expect(constituents["2MK5"].speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });

  it("has correct properties for 2MO5 (quinte-diurnal M2-O1 interaction)", () => {
    // 2MO5 = 2 × M2 + O1
    expect(constituents["2MO5"]).toBeDefined();
    const expectedSpeed = 2 * constituents.M2.speed(testAstro) + constituents.O1.speed(testAstro);
    expect(constituents["2MO5"].speed(testAstro)).toBeCloseTo(expectedSpeed, 2);
  });
});
