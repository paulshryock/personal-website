module.exports = function() {
	const { BUILD_ENV } = process.env
	const title = 'Paul Shryock'
	const year = new Date().toLocaleString('en-US', { year: 'numeric' })

	return {
		colors: {
			primary: 'black',
		},
		copyright: `© ${year} ${title}. All rights reserved.`,
		emoji: BUILD_ENV === 'local' ? '🙂' : '🎉',
		language: 'en-US',
		pronouns: ['he', 'him'],
		tagline: 'Senior Software Engineer',
		title,
	}
}
