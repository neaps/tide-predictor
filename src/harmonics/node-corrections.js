import nj from 'numjs'

const d2r = Math.PI / 180.0
const r2d = 180.0 / Math.PI

export default {
  unity() {
    return 1
  },

  f_Mm(a) {
    const omega = d2r * a.omega
    const i = d2r * a.i
    const I = d2r * a.I
    const mean =
      (2 / 3.0 - Math.pow(nj.sin(omega), 2)) *
      (1 - (3 / 2.0) * Math.pow(nu.sin(i), 2))
    return (2 / 3.0 - Math.pow(nj.sin(I), 2)) / mean
  }
}
