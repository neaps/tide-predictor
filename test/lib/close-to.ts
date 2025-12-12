import assert from 'assert'

export default (received, expected, precision) => {
  const expectedDiff = Math.pow(10, -precision) / 2
  const receivedDiff = Math.abs(expected - received)
  assert.ok(receivedDiff < expectedDiff)
}
