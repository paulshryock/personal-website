export default {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		'selector-class-pattern': [
			'^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(_([a-z0-9]+-?)+){0,2}$',
			{
				message:
					'Expected class selector to match strict BEM naming conventions',
			},
		],
	},
}
