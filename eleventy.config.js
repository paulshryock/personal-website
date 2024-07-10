/**
 * @typedef {import('@11ty/eleventy/src/UserConfig').default} UserConfig
 * @typedef {import('@11ty/eleventy/src/defaultConfig').defaultConfig} EleventyReturnValue
 * @type {(eleventyConfig: UserConfig) => EleventyReturnValue}
 */
export default function configure(eleventyConfig) {
	eleventyConfig.addWatchTarget('./src/assets/')

	return {
		dir: {
			// eslint-disable-next-line id-denylist -- Eleventy data directory.
			data: 'data',
			includes: 'includes',
			input: 'src',
			layouts: 'layouts',
			output: 'dist',
		},
	}
}
