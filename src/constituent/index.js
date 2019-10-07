import constituent from './constituent'
import compoundConstituent from './compound-constituent'
import nc from '../node-corrections'

const constituents = {}
//Long Term
constituents.Z0 = new constituent(
  'Z0',
  'Z ZZZ ZZZ',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.Sa = new constituent(
  'Sa',
  'Z ZAZ ZZZ',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.Ssa = new constituent(
  'Ssa',
  'Z ZBZ ZZZ',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.Mm = new constituent('Mm', 'Z AZY ZZZ', false, nc.u_zero, nc.f_Mm)
constituents.Mf = new constituent('Mf', 'Z BZZ ZZZ', false, nc.u_Mf, nc.f_Mf)
//Diurnals
constituents.Q1 = new constituent('Q1', 'A XZA ZZA', false, nc.u_O1, nc.f_O1)
constituents.O1 = new constituent('O1', 'A YZZ ZZA', false, nc.u_O1, nc.f_O1)
constituents.K1 = new constituent('K1', 'A AZZ ZZY', false, nc.u_K1, nc.f_K1)
constituents.J1 = new constituent('J1', 'A BZY ZZY', false, nc.u_J1, nc.f_J1)
constituents.M1 = new constituent('M1', 'A ZZZ ZZA', false, nc.u_M1, nc.f_M1)
constituents.P1 = new constituent(
  'P1',
  'A AXZ ZZA',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.S1 = new constituent(
  'S1',
  'A AYZ ZZZ',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.OO1 = new constituent(
  'OO1',
  'A CZZ ZZY',
  false,
  nc.u_OO1,
  nc.f_OO1
)
//Semi diurnals
constituents['2N2'] = new constituent(
  '2N2',
  'B XZB ZZZ',
  false,
  nc.u_M2,
  nc.f_M2
)
constituents.N2 = new constituent('N2', 'B YZA ZZZ', false, nc.u_M2, nc.f_M2)
constituents.nu2 = new constituent('nu2', 'B YBY ZZZ', false, nc.u_M2, nc.f_M2)
constituents.M2 = new constituent('M2', 'B ZZZ ZZZ', false, nc.u_M2, nc.f_M2)
constituents.lambda2 = new constituent(
  'lambda2',
  'B AXA ZZB',
  false,
  nc.u_M2,
  nc.f_M2
)
constituents.L2 = new constituent('L2', 'B AZY ZZB', false, nc.u_L2, nc.f_L2)
constituents.T2 = new constituent(
  'T2',
  'B BWZ ZAZ',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.S2 = new constituent(
  'S2',
  'B BXZ ZZZ',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.R2 = new constituent(
  'R2',
  'B BYZ ZYB',
  false,
  nc.u_zero,
  nc.f_unity
)
constituents.K2 = new constituent('K2', 'B BZZ ZZZ', false, nc.u_K2, nc.f_K2)
//Third diurnal
constituents.M3 = new constituent(
  'M3',
  'C ZZZ ZZZ',
  false,
  a => {
    return nc.u_Modd(a, 3)
  },
  a => {
    return nc.f_Modd(a, 3)
  }
)
//Compound
constituents.MSF = new compoundConstituent('MSF', [
  { constituent: constituents.S2, factor: 1 },
  { constituent: constituents.M2, factor: -1 }
])

//Diurnal
constituents['2Q1'] = new compoundConstituent('2Q1', [
  { constituent: constituents.N2, factor: 1 },
  { constituent: constituents.J1, factor: -1 }
])
constituents.rho1 = new compoundConstituent('rho1', [
  { constituent: constituents.nu2, factor: 1 },
  { constituent: constituents.K1, factor: -1 }
])

//Semi-Diurnal

constituents.mu2 = new compoundConstituent('mu2', [
  { constituent: constituents.M2, factor: 2 },
  { constituent: constituents.S2, factor: -1 }
])
constituents['2SM2'] = new compoundConstituent('2SM2', [
  { constituent: constituents.S2, factor: 2 },
  { constituent: constituents.M2, factor: -1 }
])

//Third-Diurnal
constituents['2MK3'] = new compoundConstituent('2MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.O1, factor: 1 }
])
constituents.MK3 = new compoundConstituent('MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.K1, factor: 1 }
])

//Quarter-Diurnal
constituents.MN4 = new compoundConstituent('MN4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.N2, factor: 1 }
])
constituents.M4 = new compoundConstituent('M4', [
  { constituent: constituents.M2, factor: 2 }
])
constituents.MS4 = new compoundConstituent('MS4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.S2, factor: 1 }
])
constituents.S4 = new compoundConstituent('S4', [
  { constituent: constituents.S2, factor: 2 }
])

//Sixth-Diurnal
constituents.M6 = new compoundConstituent('M6', [
  { constituent: constituents.M2, factor: 3 }
])
constituents.S6 = new compoundConstituent('S6', [
  { constituent: constituents.S2, factor: 3 }
])

//Eighth-Diurnals
constituents.M8 = new compoundConstituent('M8', [
  { constituent: constituents.M2, factor: 4 }
])

export default constituents
