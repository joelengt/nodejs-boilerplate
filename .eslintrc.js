const isNotProduction = process.env.NODE_ENV !== 'production'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'flowtype-errors'
  ],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard'
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-babel-module': {
        root: ['./src'],
        alias: {
          lib: './lib'
        }
      }
    }
  },
  env: {
    browser: false,
    node: true,
    jest: true
  },
  rules: {
    'flowtype-errors/show-errors': 2,
    'no-console': isNotProduction ? 0 : 2,
    'no-debugger': isNotProduction ? 0 : 2
  }
}
