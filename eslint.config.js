const expoConfig = require('eslint-config-expo/flat')
const prettier = require('eslint-plugin-prettier')
const prettierConfig = require('eslint-config-prettier')

module.exports = [
    {
        ignores: [
            'node_modules/',
            '.expo/',
            'dist/',
            'web-build/',
            'coverage/',
            'android/',
            'ios/',
            'build/',
            '*.config.js',
            '.metro-health-check*',
        ],
    },
    ...expoConfig,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'warn',
            '@typescript-eslint/no-empty-function': ['warn', {allow: ['arrowFunctions']}],
        },
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {prettier},
        settings: {
            'import/resolver': {
                typescript: {alwaysTryTypes: true, project: './tsconfig.json'},
                node: {extensions: ['.js', '.jsx', '.ts', '.tsx']},
            },
        },
        rules: {
            'prettier/prettier': 'error',

            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',
            'react/no-unescaped-entities': 'warn',
            'react/no-array-index-key': 'warn',
            'react/jsx-boolean-value': ['warn', 'never'],
            'react/jsx-curly-brace-presence': ['warn', {props: 'never', children: 'never'}],
            'react/jsx-fragments': ['warn', 'syntax'],
            'react/jsx-no-useless-fragment': 'warn',
            'react/self-closing-comp': ['warn', {component: true, html: true}],

            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            'import/order': 'off',
            'import/no-unresolved': 'off',
            'import/no-duplicates': 'error',
            'import/no-cycle': ['warn', {maxDepth: 3}],
            'import/newline-after-import': 'warn',

            'no-console': ['warn', {allow: ['warn', 'error']}],
            'no-debugger': 'error',
            'no-alert': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-arrow-callback': 'warn',
            'prefer-template': 'warn',
            'object-shorthand': 'warn',
            'no-else-return': 'warn',
            'no-lonely-if': 'warn',
            'no-nested-ternary': 'warn',
            'no-unneeded-ternary': 'warn',
            'no-param-reassign': ['warn', {props: false}],
            'no-unused-expressions': ['warn', {allowShortCircuit: true, allowTernary: true}],
            'no-undef': 'off',

            eqeqeq: ['error', 'always', {null: 'ignore'}],
            curly: ['error', 'all'],
            'default-case': 'warn',
            'default-case-last': 'warn',
            'no-fallthrough': 'error',
            'no-throw-literal': 'error',
            'no-multiple-empty-lines': ['warn', {max: 1, maxEOF: 0}],
        },
    },
    prettierConfig,
]
