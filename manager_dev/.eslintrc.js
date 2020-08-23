module.exports = {
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  },
  rules: {
    'vue/html-quotes': ['error', 'double' | 'single']
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
};
