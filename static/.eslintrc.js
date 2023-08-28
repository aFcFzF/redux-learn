module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    project: [
      './tsconfig.json',
    ],
  },

  ignorePatterns: ['babel.config.js', '.eslintrc.js'],

  extends: [
    '@tencent/eslint-config-tencent',
    '@tencent/eslint-config-tencent/ts',
  ],

  env: {
    browser: true,
  },

  plugins: [
    'react',
    'react-hooks',
  ],

  rules: {
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-require-imports': 2,
    'prefer-nullish-coalescing': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
    'react-hooks/exhaustive-deps': ['error'],
    eqeqeq: [2, 'allow-null'],
    'max-len': [
      'error',
      {
        code: 200,
      },
    ],
    'no-multi-spaces': ['error'],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    'eol-last': ['error'],
  },
};