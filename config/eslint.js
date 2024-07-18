import eslint from '@eslint/js'

/**
 * Recommended lint configuration.
 *
 * @type  {typeof eslint.configs.recommended}
 * @since unreleased
 */
const recommended = {
	rules: {
		...eslint.configs.recommended.rules,
		'block-scoped-var': 'error',
		camelcase: 'error',
		complexity: ['error', 4],
		curly: ['error', 'multi-or-nest'],
		'default-case': 'error',
		'default-case-last': 'error',
		'default-param-last': 'error',
		'dot-notation': 'error',
		eqeqeq: 'error',
		'func-name-matching': 'error',
		'func-names': 'error',
		'func-style': ['error', 'declaration'],
		'grouped-accessor-pairs': ['error', 'getBeforeSet'],
		'id-denylist': ['error', 'data', 'err', 'e', 'cb', 'callback'],
		'max-depth': ['error', 4],
		'max-lines': [
			'error',
			{ max: 500, skipBlankLines: true, skipComments: true },
		],
		'max-lines-per-function': [
			'warn',
			{ IIFEs: true, max: 15, skipBlankLines: true, skipComments: true },
		],
		'max-params': ['error', 3],
		'multiline-comment-style': 'error',
		'new-cap': 'error',
		'no-alert': 'warn',
		'no-array-constructor': 'error',
		'no-bitwise': 'error',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-console': 'error',
		'no-delete-var': 'error',
		'no-else-return': 'error',
		'no-empty': ['error', { allowEmptyCatch: true }],
		'no-empty-function': ['error', { allow: ['constructors'] }],
		'no-empty-static-block': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-floating-decimal': 'error',
		'no-implicit-coercion': 'error',
		'no-implicit-globals': 'error',
		'no-implied-eval': 'error',
		'no-inline-comments': 'error',
		'no-invalid-this': 'error',
		'no-iterator': 'error',
		'no-label-var': 'error',
		'no-labels': 'error',
		'no-lone-blocks': 'error',
		'no-lonely-if': 'error',
		'no-loop-func': 'error',
		'no-mixed-operators': 'error',
		'no-multi-assign': 'error',
		'no-multi-str': 'error',
		'no-negated-condition': 'error',
		'no-nested-ternary': 'error',
		'no-new': 'error',
		'no-new-func': 'error',
		'no-new-object': 'error',
		'no-new-wrappers': 'error',
		'no-nonoctal-decimal-escape': 'error',
		'no-octal-escape': 'error',
		'no-param-reassign': [
			'error',
			{ ignorePropertyModificationsForRegex: ['Mutable$'], props: true },
		],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-proto': 'error',
		'no-restricted-globals': [
			'error',
			{ message: 'Use Number.isNaN instead.', name: 'isNaN' },
		],
		'no-return-assign': 'error',
		'no-return-await': 'off',
		'no-script-url': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-undef': 'off',
		'no-undef-init': 'error',
		'no-undefined': 'error',
		'no-underscore-dangle': [
			'error',
			{
				allow: ['__dirname', '__filename'],
				enforceInClassFields: true,
				enforceInMethodNames: true,
			},
		],
		'no-unneeded-ternary': ['error', { defaultAssignment: false }],
		'no-unused-expressions': [
			'error',
			{ allowShortCircuit: true, allowTernary: true },
		],
		'no-useless-call': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-concat': 'error',
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-void': 'error',
		'no-warning-comments': 'warn',
		'object-shorthand': 'error',
		'one-var': ['error', 'never'],
		'one-var-declaration-per-line': ['error', 'always'],
		'operator-assignment': 'error',
		'prefer-arrow-callback': 'error',
		'prefer-const': 'error',
		'prefer-destructuring': 'error',
		'prefer-exponentiation-operator': 'error',
		'prefer-named-capture-group': 'error',
		'prefer-object-has-own': 'error',
		'prefer-object-spread': 'error',
		'prefer-promise-reject-errors': 'error',
		'prefer-regex-literals': 'error',
		'prefer-rest-params': 'error',
		'prefer-spread': 'error',
		'prefer-template': 'error',
		'quote-props': ['error', 'as-needed'],
		radix: 'error',
		'require-unicode-regexp': 'error',
		'sort-imports': ['error', { ignoreCase: true }],
		'sort-keys': 'error',
		'spaced-comment': ['error', 'always', { block: { balanced: true } }],
		strict: ['error', 'safe'],
		'symbol-description': 'error',
		'use-isnan': ['error', { enforceForIndexOf: true }],
		yoda: 'error',
	},
}

/**
 * Lint configuration for comments.
 *
 * @type  {typeof eslint.configs.recommended}
 * @since unreleased
 * @todo
 */
const comments = { rules: {} }

/**
 * Lint configuration for JSDoc comments.
 *
 * @type  {typeof eslint.configs.recommended}
 * @since unreleased
 * @todo
 */
const jsdoc = { rules: {} }

/**
 * Lint configuration tweaks for tests.
 *
 * @type  {typeof eslint.configs.recommended}
 * @since unreleased
 */
const tests = {
	rules: {
		'max-lines': 'off',
		'max-lines-per-function': 'off',
		'no-console': 'off',
	},
}

/**
 * Lint configuration for TypeScript files.
 *
 * @type {typeof eslint.configs.recommended}
 * @since unreleased
 */
const typescript = {
	rules: {
		'@typescript-eslint/no-confusing-void-expression': [
			'error',
			{ ignoreArrowShorthand: true },
		],
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/restrict-template-expressions': [
			'error',
			{ allowNumber: true },
		],
	},
}

export const configs = {
	comments,
	jsdoc,
	recommended,
	tests,
	typescript,
}

export default { configs }
