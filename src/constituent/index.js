import Constituent from './constituent'
import CompoundConstituent from './compound-constituent'
import nc from '../node-corrections'

const constituents = {}
// Long Term
constituents.Z0 = new Constituent('Z0', 'Z ZZZ ZZZ', false, nc.uZero, nc.fUnity)
constituents.Sa = new Constituent('Sa', 'Z ZAZ ZZZ', false, nc.uZero, nc.fUnity)
constituents.Ssa = new Constituent(
  'Ssa',
  'Z ZBZ ZZZ',
  false,
  nc.uZero,
  nc.fUnity
)
constituents.Mm = new Constituent('Mm', 'Z AZY ZZZ', false, nc.uZero, nc.fMm)
constituents.Mf = new Constituent('Mf', 'Z BZZ ZZZ', false, nc.uMf, nc.fMf)
// Diurnals
constituents.Q1 = new Constituent('Q1', 'A XZA ZZA', false, nc.uO1, nc.fO1)
constituents.O1 = new Constituent('O1', 'A YZZ ZZA', false, nc.uO1, nc.fO1)
constituents.K1 = new Constituent('K1', 'A AZZ ZZY', false, nc.uK1, nc.fK1)
constituents.J1 = new Constituent('J1', 'A BZY ZZY', false, nc.uJ1, nc.fJ1)
constituents.M1 = new Constituent('M1', 'A ZZZ ZZA', false, nc.uM1, nc.fM1)
constituents.P1 = new Constituent('P1', 'A AXZ ZZA', false, nc.uZero, nc.fUnity)
constituents.S1 = new Constituent('S1', 'A AYZ ZZZ', false, nc.uZero, nc.fUnity)
constituents.OO1 = new Constituent('OO1', 'A CZZ ZZY', false, nc.uOO1, nc.fOO1)
// Semi diurnals
constituents['2N2'] = new Constituent('2N2', 'B XZB ZZZ', false, nc.uM2, nc.fM2)
constituents.N2 = new Constituent('N2', 'B YZA ZZZ', false, nc.uM2, nc.fM2)
constituents.nu2 = new Constituent('nu2', 'B YBY ZZZ', false, nc.uM2, nc.fM2)
constituents.M2 = new Constituent('M2', 'B ZZZ ZZZ', false, nc.uM2, nc.fM2)
constituents.lambda2 = new Constituent(
  'lambda2',
  'B AXA ZZB',
  false,
  nc.uM2,
  nc.fM2
)
constituents.L2 = new Constituent('L2', 'B AZY ZZB', false, nc.uL2, nc.fL2)
constituents.T2 = new Constituent('T2', 'B BWZ ZAZ', false, nc.uZero, nc.fUnity)
constituents.S2 = new Constituent('S2', 'B BXZ ZZZ', false, nc.uZero, nc.fUnity)
constituents.R2 = new Constituent('R2', 'B BYZ ZYB', false, nc.uZero, nc.fUnity)
constituents.K2 = new Constituent('K2', 'B BZZ ZZZ', false, nc.uK2, nc.fK2)
// Third diurnal
constituents.M3 = new Constituent(
  'M3',
  'C ZZZ ZZZ',
  false,
  a => {
    return nc.uModd(a, 3)
  },
  a => {
    return nc.fModd(a, 3)
  }
)
// Compound
constituents.MSF = new CompoundConstituent('MSF', [
  { constituent: constituents.S2, factor: 1 },
  { constituent: constituents.M2, factor: -1 }
])

// Diurnal
constituents['2Q1'] = new CompoundConstituent('2Q1', [
  { constituent: constituents.N2, factor: 1 },
  { constituent: constituents.J1, factor: -1 }
])
constituents.rho1 = new CompoundConstituent('rho1', [
  { constituent: constituents.nu2, factor: 1 },
  { constituent: constituents.K1, factor: -1 }
])

// Semi-Diurnal

constituents.mu2 = new CompoundConstituent('mu2', [
  { constituent: constituents.M2, factor: 2 },
  { constituent: constituents.S2, factor: -1 }
])
constituents['2SM2'] = new CompoundConstituent('2SM2', [
  { constituent: constituents.S2, factor: 2 },
  { constituent: constituents.M2, factor: -1 }
])

// Third-Diurnal
constituents['2MK3'] = new CompoundConstituent('2MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.O1, factor: 1 }
])
constituents.MK3 = new CompoundConstituent('MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.K1, factor: 1 }
])

// Quarter-Diurnal
constituents.MN4 = new CompoundConstituent('MN4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.N2, factor: 1 }
])
constituents.M4 = new CompoundConstituent('M4', [
  { constituent: constituents.M2, factor: 2 }
])
constituents.MS4 = new CompoundConstituent('MS4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.S2, factor: 1 }
])
constituents.S4 = new CompoundConstituent('S4', [
  { constituent: constituents.S2, factor: 2 }
])

// Sixth-Diurnal
constituents.M6 = new CompoundConstituent('M6', [
  { constituent: constituents.M2, factor: 3 }
])
constituents.S6 = new CompoundConstituent('S6', [
  { constituent: constituents.S2, factor: 3 }
])

// Eighth-Diurnals
constituents.M8 = new CompoundConstituent('M8', [
  { constituent: constituents.M2, factor: 4 }
])

export default constituents
