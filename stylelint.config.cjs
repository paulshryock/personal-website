module.exports = {
	customSyntax: 'postcss-scss',
	extends: 'stylelint-config-standard-scss',
	rules: {
		'scss/at-import-no-partial-leading-underscore': null,
		'scss/at-import-partial-extension': null,
		'selector-class-pattern': [
			'^.[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
			{
				message: 'Expected class selector to follow BEM naming convention',
			},
		],
	},
}
