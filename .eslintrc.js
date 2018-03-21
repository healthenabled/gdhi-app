// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue
  extends: ['eslint:recommended', 'plugin:vue/strongly-recommended'],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'no-unused-vars': 1,
    'no-console': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  plugins: ["vue"],
  globals: {
    "$": true,
    "jQuery": true
  },
}
