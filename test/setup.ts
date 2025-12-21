import { expect } from 'vitest'

expect.extend({
  toBeWithin(received, expected, delta) {
    const diff = Math.abs(received - expected)
    const pass = diff <= delta
    return {
      pass,
      message: () =>
        `expected ${received} to be within ±${delta} of ${expected}, but was ${diff}`
    }
  }
})

interface CustomMatchers<R = unknown> {
  toBeWithin: (expected: number, delta: number) => R
}

declare module 'vitest' {
  // eslint-disable-next-line
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
