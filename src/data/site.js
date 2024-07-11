/* istanbul ignore next */
const host = 'paulshryock.dev'
/* istanbul ignore next */
const title = 'Paul Shryock'

/**
 * Site data.
 *
 * @type  {{
 *   copyright: string
 *   description: string
 *   host: string
 *   language: string
 *   origin: string
 *   pronouns: string[]
 *   tagline: string
 *   title: string
 * }}
 * @since unreleased
 */
export default {
	copyright: `Copyright ${new Date().toLocaleString('en-US', { year: 'numeric' })} ${title}. All rights reserved.`,
	description:
		'Senior software engineer with 15+ years experience, currently building better editorial content publishing tools for the NBA.',
	host,
	language: 'en-US',
	origin: `https://${host}`,
	pronouns: ['he', 'him'],
	tagline: 'Senior Software Engineer @ NBA',
	title,
}
