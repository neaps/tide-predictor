import constituent from './constituent.js'
import compoundConstituent from './compound-constituent.js'
import nc from '../node-corrections/index.js'

const constituents = {}
// Long Term
constituents.Z0 = constituent('Z0', [0, 0, 0, 0, 0, 0, 0], nc.uZero, nc.fUnity)
constituents.SA = constituent('Sa', [0, 0, 1, 0, 0, 0, 0], nc.uZero, nc.fUnity)
constituents.SSA = constituent(
  'Ssa',
  [0, 0, 2, 0, 0, 0, 0],
  nc.uZero,
  nc.fUnity
)
constituents.MM = constituent('MM', [0, 1, 0, -1, 0, 0, 0], nc.uZero, nc.fMm)
constituents.MF = constituent('MF', [0, 2, 0, 0, 0, 0, 0], nc.uMf, nc.fMf)
// Diurnals
constituents.Q1 = constituent('Q1', [1, -2, 0, 1, 0, 0, 1], nc.uO1, nc.fO1)
constituents.O1 = constituent('O1', [1, -1, 0, 0, 0, 0, 1], nc.uO1, nc.fO1)
constituents.K1 = constituent('K1', [1, 1, 0, 0, 0, 0, -1], nc.uK1, nc.fK1)
constituents.J1 = constituent('J1', [1, 2, 0, -1, 0, 0, -1], nc.uJ1, nc.fJ1)
constituents.M1 = constituent('M1', [1, 0, 0, 0, 0, 0, 1], nc.uM1, nc.fM1)
constituents.P1 = constituent('P1', [1, 1, -2, 0, 0, 0, 1], nc.uZero, nc.fUnity)
constituents.S1 = constituent('S1', [1, 1, -1, 0, 0, 0, 0], nc.uZero, nc.fUnity)
constituents.OO1 = constituent('OO1', [1, 3, 0, 0, 0, 0, -1], nc.uOO1, nc.fOO1)
// Semi diurnals
constituents['2N2'] = constituent('2N2', [2, -2, 0, 2, 0, 0, 0], nc.uM2, nc.fM2)
constituents.N2 = constituent('N2', [2, -1, 0, 1, 0, 0, 0], nc.uM2, nc.fM2)
constituents.NU2 = constituent('NU2', [2, -1, 2, -1, 0, 0, 0], nc.uM2, nc.fM2)
constituents.M2 = constituent('M2', [2, 0, 0, 0, 0, 0, 0], nc.uM2, nc.fM2)
constituents.LAM2 = constituent('LAM2', [2, 1, -2, 1, 0, 0, 2], nc.uM2, nc.fM2)
constituents.L2 = constituent('L2', [2, 1, 0, -1, 0, 0, 2], nc.uL2, nc.fL2)
constituents.T2 = constituent('T2', [2, 2, -3, 0, 0, 1, 0], nc.uZero, nc.fUnity)
constituents.S2 = constituent('S2', [2, 2, -2, 0, 0, 0, 0], nc.uZero, nc.fUnity)
constituents.R2 = constituent(
  'R2',
  [2, 2, -1, 0, 0, -1, 2],
  nc.uZero,
  nc.fUnity
)
constituents.K2 = constituent('K2', [2, 2, 0, 0, 0, 0, 0], nc.uK2, nc.fK2)
// Third diurnal
constituents.M3 = constituent(
  'M3',
  [3, 0, 0, 0, 0, 0, 0],
  (a) => {
    return nc.uModd(a, 3)
  },
  (a) => {
    return nc.fModd(a, 3)
  }
)
// Compound
constituents.MSF = compoundConstituent('MSF', [
  { constituent: constituents.S2, factor: 1 },
  { constituent: constituents.M2, factor: -1 }
])

// Diurnal
constituents['2Q1'] = compoundConstituent('2Q1', [
  { constituent: constituents.N2, factor: 1 },
  { constituent: constituents.J1, factor: -1 }
])
constituents.RHO = compoundConstituent('RHO', [
  { constituent: constituents.NU2, factor: 1 },
  { constituent: constituents.K1, factor: -1 }
])

// Semi-Diurnal

constituents.MU2 = compoundConstituent('MU2', [
  { constituent: constituents.M2, factor: 2 },
  { constituent: constituents.S2, factor: -1 }
])
constituents['2SM2'] = compoundConstituent('2SM2', [
  { constituent: constituents.S2, factor: 2 },
  { constituent: constituents.M2, factor: -1 }
])

// Third-Diurnal
constituents['2MK3'] = compoundConstituent('2MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.O1, factor: 1 }
])
constituents.MK3 = compoundConstituent('MK3', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.K1, factor: 1 }
])

// Quarter-Diurnal
constituents.MN4 = compoundConstituent('MN4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.N2, factor: 1 }
])
constituents.M4 = compoundConstituent('M4', [
  { constituent: constituents.M2, factor: 2 }
])
constituents.MS4 = compoundConstituent('MS4', [
  { constituent: constituents.M2, factor: 1 },
  { constituent: constituents.S2, factor: 1 }
])
constituents.S4 = compoundConstituent('S4', [
  { constituent: constituents.S2, factor: 2 }
])

// Sixth-Diurnal
constituents.M6 = compoundConstituent('M6', [
  { constituent: constituents.M2, factor: 3 }
])
constituents.S6 = compoundConstituent('S6', [
  { constituent: constituents.S2, factor: 3 }
])

// Eighth-Diurnals
constituents.M8 = compoundConstituent('M8', [
  { constituent: constituents.M2, factor: 4 }
])

export default constituents
