module.exports = {
  verbose: false,
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
