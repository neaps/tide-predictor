import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/index.js',
  output: [
    {
      name: 'tidePredictor',
      file: pkg.browser,
      format: 'umd'
    },
    { file: pkg.commonjs, format: 'commonjs', exports: 'default' }
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],

      jail: '/src'
    })
  ]
}
