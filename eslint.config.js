import globals from 'globals';

export default [
  {
    files: ['**/*.js'],
    extends: ['eslint:recommended', 'plugin:import/recommended'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'module',
      ecmaVersion: 2020,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: ['import'],
    rules: {
      'no-unused-vars': 'error',
      'import/no-unresolved': 'off',
      'import/extensions': [
        'error',
        'always',
        {
          js: 'always',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.json'],
        },
      },
    },
  },
  {
    ignores: ['.config/*', 'node_modules/*', 'coverage/*'],
  },
];
