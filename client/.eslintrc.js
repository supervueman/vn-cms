module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs'
  ],
  // add your custom rules here
  rules: {
    quotes: 0,
    semi: 0,
    'no-console': 0,
    'arrow-parens': 0
  }
}
