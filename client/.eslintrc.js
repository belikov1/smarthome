module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential'],
  rules: {
    'no-console': 'off', //'warn',
    'no-unused-vars': 'warn',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    $nuxt: true,
    Vue: true,
  },
};
