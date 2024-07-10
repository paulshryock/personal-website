export default {
	extends: ['stylelint-config-standard-scss'],
	plugins: [
		/**
		 * @see https://github.com/RJWadley/stylelint-no-unsupported-browser-features?tab=readme-ov-file#options
		 */
		'stylelint-no-unsupported-browser-features',
	],
	rules: {
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
			},
		],
	},
}
