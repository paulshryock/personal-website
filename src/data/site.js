/**
 * Site data.
 *
 * @type  {{
 *   copyright: string
 *   description: string
 *   host: string
 *   language: string
 *   pronouns: string[]
 *   tagline: string
 *   title: string
 * }}
 * @since unreleased
 */
export default {
	copyright: `Copyright ${new Date().toLocaleString('en-US', { year: 'numeric' })} Paul Shryock. All rights reserved.`,
	description:
		'Senior software engineer with 15+ years experience, currently building better editorial content publishing tools for the NBA.',
	host: 'paulshryock.dev',
	language: 'en-US',
	pronouns: ['he', 'him'],
	tagline: 'Senior Software Engineer @ NBA',
	title: 'Paul Shryock',
}
