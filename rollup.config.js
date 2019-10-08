import pkg from './package.json'

export default {
  input: './src/index.js',
  output: [
    {
      name: 'Neaps',
      file: pkg.browser,
      format: 'umd'
    },
    { file: pkg.module, format: 'es' }
  ]
}
