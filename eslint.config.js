import { dirname } from 'node:path'
import eslint from './config/eslint.js'
import { fileURLToPath } from 'node:url'
import globals from 'globals'
import prettierConfig from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default tseslint.config(
	{ ignores: ['.cache/**', 'coverage/**', 'dist/**'] },
	{
		files: ['**/*'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: { ...globals.browser, ...globals.node },
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: __dirname,
			},
			sourceType: 'module',
		},
		linterOptions: {
			noInlineConfig: false,
			reportUnusedDisableDirectives: true,
		},
		name: 'personal-website/all-files',
		rules: eslint.configs.recommended.rules,
	},
	{
		files: ['**/*.cts', '**/*.cjs'],
		languageOptions: { sourceType: 'commonjs' },
		name: 'personal-website/common-js-files',
	},
	...tseslint.configs.strictTypeChecked.map((config) => ({
		...config,
		files: ['**/*.ts'],
		rules: {
			...config.rules,
			'@typescript-eslint/no-confusing-void-expression': [
				'error',
				{ ignoreArrowShorthand: true },
			],
			'@typescript-eslint/restrict-template-expressions': [
				'error',
				{ allowNumber: true },
			],
		},
	})),
	...tseslint.configs.stylisticTypeChecked.map((config) => ({
		...config,
		files: ['**/*.ts'],
	})),
	{
		files: ['src/data/**/*'],
		name: 'personal-website/data-files',
		rules: { camelcase: 'off' },
	},
	{
		files: ['tests/**/*.test.ts'],
		name: 'personal-website/test-files',
		rules: eslint.configs.tests.rules,
	},
	prettierConfig,
)
