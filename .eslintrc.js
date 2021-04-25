module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    'prettier',
    'plugin:vue/recommended', // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    'prettier/prettier': ['error'],
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
}
