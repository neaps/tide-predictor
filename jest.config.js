module.exports = {
  verbose: false,
  reporters: ['default', 'jest-junit'],
  testPathIgnorePatterns: [
    `<rootDir>/examples/`,
    `<rootDir>/lib/`,
    `<rootDir>/www/`,
    `<rootDir>/dist/`,
    `<rootDir>/node_modules/`
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
