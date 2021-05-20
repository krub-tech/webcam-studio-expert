module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/prefer-default-export': 'off',
    'vue/no-deprecated-v-on-native-modifier': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      nuxt: {
        extensions: ['.js', '.vue'],
      },
    },
  },
}
