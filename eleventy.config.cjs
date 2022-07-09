// eslint-disable-next-line @typescript-eslint/no-var-requires
const { minify } = require('html-minifier')

module.exports = function (eleventyConfig) {
	// Minify HTML.
	eleventyConfig.addTransform('html-minifier', function(content, outputPath) {
		if (!outputPath || !outputPath.endsWith('.html')) return content

		return minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		})
	})

	eleventyConfig.addWatchTarget('./src/fonts/')
	eleventyConfig.addWatchTarget('./src/img/')
	eleventyConfig.addWatchTarget('./src/scss/')
	eleventyConfig.addWatchTarget('./src/ts/')

	return {
		dir: {
			data: 'data',
			includes: 'liquid/components',
			input: 'src',
			layouts: 'liquid/layouts',
			output: 'dist',
		},
	}
}
