module.exports = function() {
	const title = 'Paul Shryock'
	const year = new Date().toLocaleString('en-US', { year: 'numeric' })

	return {
		colors: { primary: 'black' },
		copyright: `© ${year} ${title}. All rights reserved.`,
		emoji: '☕',
		language: 'en-US',
		pronouns: ['he', 'him'],
		tagline: 'Senior Software Engineer @ NBA',
		title,
	}
}
