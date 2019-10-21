const d2r = Math.PI / 180.0
const r2d = 180.0 / Math.PI

const modulus = (a, b) => {
  return ((a % b) + b) % b
}

export { d2r, r2d, modulus }
