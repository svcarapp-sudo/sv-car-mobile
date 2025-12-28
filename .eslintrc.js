module.exports = {
    root: true,
    extends: [
        'expo',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
            'babel-module': {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                root: ['./'],
                alias: {
                    '@': './src',
                    '@/features': './src/features',
                    '@/shared': './src/shared',
                    '@/core': './src/core',
                    '@/components': './src/shared/components',
                    '@/utils': './src/shared/utils',
                    '@/types': './src/shared/types',
                    '@/constants': './src/shared/constants',
                    '@/hooks': './src/shared/hooks',
                    '@/services': './src/shared/services',
                    '@/navigation': './src/core/navigation',
                    '@/store': './src/core/store',
                },
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    rules: {
        // Prettier integration
        'prettier/prettier': 'error',

        // TypeScript rules
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/ban-ts-comment': [
            'warn',
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': 'allow-with-description',
                'ts-nocheck': 'allow-with-description',
                'ts-check': false,
            },
        ],
        '@typescript-eslint/no-empty-function': ['warn', {allow: ['arrowFunctions']}],

        // React rules
        'react/react-in-jsx-scope': 'off', // Not needed in React 17+
        'react/prop-types': 'off', // Using TypeScript for prop validation
        'react/display-name': 'off',
        'react/no-unescaped-entities': 'warn',
        'react/no-array-index-key': 'warn',
        'react/jsx-boolean-value': ['warn', 'never'],
        'react/jsx-curly-brace-presence': ['warn', {props: 'never', children: 'never'}],
        'react/jsx-fragments': ['warn', 'syntax'],
        'react/jsx-no-useless-fragment': 'warn',
        'react/self-closing-comp': ['warn', {component: true, html: true}],

        // React Hooks rules
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // Import/Export rules
        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'react-native',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: 'expo*',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@/**',
                        group: 'internal',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react', 'react-native'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'import/no-unresolved': 'error',
        'import/no-duplicates': 'error',
        'import/no-unused-modules': 'off', // Can be slow, enable if needed
        'import/no-cycle': ['warn', {maxDepth: 3}],
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'off',
        'import/newline-after-import': 'warn',

        // General code quality rules
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
        'prefer-destructuring': [
            'warn',
            {
                array: false,
                object: true,
            },
        ],
        'no-param-reassign': ['warn', {props: false}],
        'no-unused-expressions': ['warn', {allowShortCircuit: true, allowTernary: true}],

        // Best practices
        eqeqeq: ['error', 'always', {null: 'ignore'}],
        curly: ['error', 'all'],
        'default-case': 'warn',
        'default-case-last': 'warn',
        'no-fallthrough': 'error',
        'no-implicit-coercion': 'warn',
        'no-return-assign': 'error',
        'no-return-await': 'warn',
        'no-throw-literal': 'error',
        'require-await': 'off',

        // Code style (many handled by Prettier, but some useful additions)
        'no-multiple-empty-lines': ['warn', {max: 1, maxEOF: 0}],
        'padding-line-between-statements': [
            'warn',
            {blankLine: 'always', prev: '*', next: 'return'},
            {blankLine: 'always', prev: '*', next: 'if'},
            {blankLine: 'always', prev: 'if', next: '*'},
        ],
    },
    ignorePatterns: [
        'node_modules/',
        '.expo/',
        'dist/',
        'web-build/',
        '*.config.js',
        '*.config.ts',
        'coverage/',
        '.metro-health-check*',
    ],
    env: {
        es6: true,
        node: true,
    },
}
