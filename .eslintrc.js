module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'prettier', 'sealui', 'sealui/lib/vue'],
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-undefined': 0,
    'no-param-reassign': 0,
    'no-unmodified-loop-condition': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
