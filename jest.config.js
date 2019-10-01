module.exports = {
  notify: true,
  verbose: true,
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
