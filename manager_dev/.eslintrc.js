module.exports = {
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'vue/html-quotes': ['error', 'double' | 'single']
  }
};
