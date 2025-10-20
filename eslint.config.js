import tseslint from 'typescript-eslint'
import globals from 'globals'
import eslint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPrettier from 'eslint-plugin-prettier'
import importSort from 'eslint-plugin-simple-import-sort'
const frontendMonitorConfig = {
    files: ['apps/frontend/web/**/*.{ts, tsx}'],
    ignores: [],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser
    },
    plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'no-console': 'error',
    }
}
const backendMonitorConfig = {
    files: ['apps/backend/**/*.ts'],
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.jest,
        },
        parser: tseslint.parser,
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-console': 'error',
    },
}
const ignores = [
    "dist",
    "build",
    "**/*.js",
    "**/*.mjs",
    "**/*.d.ts",
    "eslint.config.js",
    "commitlint.config.js",
    "apps/frontend/monitor/src/components/ui/**/*",
    "packages/browser-utils/src/metrics/**/*"
]


export default tseslint.config({
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    ignores,
    plugins: {
        prettier: eslintPrettier,
        "simple-import-sort": importSort

    },
    rules: {
        "prettier/prettier": "error",
        "simple-import-sort/imports": [
            'error',
            {
                groups: [
                    ['^\\w'], // 表示 node 内置模块
                    ['^@\\w'],  // 表示以 @ 开头的路径
                    ['^@/'], // 表示以 @ 开头的自定义识别路径
                    ['^\\u0000'],
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
                ]
            }
        ],
        "simple-import-sort/exports": "error",
    }
}, frontendMonitorConfig, backendMonitorConfig)