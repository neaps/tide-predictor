import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/index.js',
  output: [
    {
      name: 'tidePredictor',
      file: pkg.browser,
      format: 'umd'
    }
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],

      jail: '/src'
    })
  ]
}
