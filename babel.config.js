module.exports = {
  presets: ['@babel/preset-env'],
  env: {
    test: {},
    build: {
      ignore: ['**/__tests__', '**/__mocks__']
    }
  }
}
