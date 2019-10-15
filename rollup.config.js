import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: './src/index.js',
  output: [
    {
      name: 'TidePredictor',
      file: pkg.browser,
      format: 'umd'
    },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    resolve({
      mainFields: ['module', 'main'],

      jail: '/src' // Default: '/'
    })
  ]
}
