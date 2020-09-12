module.exports = {
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'vue/html-quotes': ['error', 'double' | 'single'],
    'vue/custom-event-name-casing': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
  }
};
