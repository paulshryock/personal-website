import designTokens from '../design.tokens.js'
import Eleventy from '@11ty/eleventy'
import swc, { Output as SwcOutput } from '@swc/core'
import autoprefixer from 'autoprefixer'
import browserslist from 'browserslist'
import cssnano from 'cssnano'
import chokidar from 'chokidar'
import esbuild, {
	BuildFailure as EsbuildFailure,
	BuildResult as EsbuildResult,
	Message as EsbuildMessage,
} from 'esbuild'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import postcssAdvancedVariables from 'postcss-advanced-variables'
import postcssEasyImport from 'postcss-easy-import'
import postcssNested from 'postcss-nested'
import postcssScss from 'postcss-scss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** Parsed package.json content. */
const pkg = JSON.parse(
	await readFile(resolve(__dirname, '..', 'package.json'), 'utf8'),
)

const { BUILD_ENV, BUILD_SERVE, BUILD_WATCH } = process.env
const ENV = BUILD_ENV ?? 'production'
const SERVE = BUILD_SERVE === 'true'
const VERSION = pkg.version ?? ''
const WATCH = SERVE || BUILD_WATCH === 'true'

/** Eleventy instance. */
const eleventy = new Eleventy('src', 'dist', {
	configPath: 'eleventy.config.cjs',
	quietMode: true,
})

// Silence Eleventy.
if (WATCH) eleventy.logger.message = (message: string) => message

/** Esbuild watch mode. */
const esbuildWatch: boolean | esbuild.WatchMode = WATCH
	? {
			onRebuild(error: EsbuildFailure | null, result: EsbuildResult | null) {
				if (error) {
					const { errors, warnings } = error
					if (errors?.length || warnings?.length) {
						process.exitCode = 1
						errors.forEach((e: EsbuildMessage) => console.error(e))
						warnings.forEach((w: EsbuildMessage) => console.warn(w))
					}
				} else if (result) {
					(async () => {
						// Transpile ES2015 to ES5 for legacy browsers.
						await swc
							.transform(await readFile('dist/js/main.js', 'utf8'), {
								filename: '../../src/ts/main.ts',
								isModule: false,
								jsc: {
									target: 'es5',
								},
								minify: true,
								sourceMaps: true,
							})
							.then(async (output: SwcOutput) => {
								await Promise.all([
									writeFile('dist/js/main-legacy.min.js', output.code, 'utf8'),
									writeFile(
										'dist/js/main-legacy.min.js.map',
										output.map ?? '',
										'utf8',
									),
								])
							})
					})()
				}
			},
	  }
	: false

/**
 * Compiles Sass into CSS.
 *
 * @since  unreleased
 * @return {Promise<void | [undefined | void, undefined | void]>}
 */
async function compileSass(): Promise<
	void | [undefined | void, undefined | void]
	> {
	return Promise.all([
		postcss([
			postcssEasyImport({
				extensions: 'scss',
				prefix: '_',
			}),
			postcssAdvancedVariables({ variables: designTokens }),
			postcssNested(),
			autoprefixer,
			cssnano({ preset: 'default' }),
		]).process(await readFile('src/scss/main.scss', 'utf8'), {
			from: 'src/scss/main.scss',
			map: {
				inline: false,
			},
			parser: postcssScss,
			to: 'dist/css/main.css',
		}),
		mkdir(resolve(__dirname, '..', 'dist', 'css'), { recursive: true }),
	])
		.then(async ([postcssResult]) => {
			return await Promise.all([
				writeFile(postcssResult.opts.to ?? '', postcssResult.css, 'utf8'),
				writeFile(
					(postcssResult.opts.to ?? '') + '.map',
					postcssResult.map.toString(),
					'utf8',
				),
			])
		})
		.catch((error) => {
			process.exitCode = 1
			console.error(error)
		})
}

await Promise.all([
	// Compile HTML.
	(WATCH ? eleventy.watch() : eleventy.write()).then(() => {
		if (SERVE) eleventy.serve()
	}),

	// Compile Sass.
	compileSass().then(async () => {
		if (WATCH) {
			chokidar.watch('src/scss/**/*.scss').on('change', () => {
				compileSass()
			})
		}
	}),

	// Compile TypeScript to ES2015.
	esbuild
		.build({
			bundle: true,
			define: {
				process: JSON.stringify({
					env: {
						BUILD_ENV: ENV,
						BUILD_VERSION: VERSION,
					},
				}),
			},
			entryPoints: ['src/ts/main.ts'],
			format: 'iife',
			incremental: WATCH,
			minify: true,
			outdir: 'dist/js',
			platform: 'browser',
			sourcemap: true,
			target: resolveToEsbuildTarget(browserslist(pkg.browserslist), {
				printUnknownTargets: false,
			}),
			watch: esbuildWatch,
		})
		.then(async (result: EsbuildResult) => {
			if (result.errors?.length > 0) {
				process.exitCode = 1
				result.errors.forEach((error: EsbuildMessage) => console.error(error))
			}

			if (result.warnings?.length > 0) {
				process.exitCode = 1
				result.warnings.forEach((warning: EsbuildMessage) =>
					console.warn(warning),
				)
			}

			// Transpile ES2015 to ES5 for legacy browsers.
			await swc
				.transform(await readFile('dist/js/main.js', 'utf8'), {
					filename: '../../src/ts/main.ts',
					isModule: false,
					jsc: {
						target: 'es5',
					},
					minify: true,
					sourceMaps: true,
				})
				.then(async (output: SwcOutput) => {
					await Promise.all([
						writeFile('dist/js/main-legacy.min.js', output.code, 'utf8'),
						writeFile(
							'dist/js/main-legacy.min.js.map',
							output.map ?? '',
							'utf8',
						),
					])
				})
		}),

	// Compile images.
	// todo: Process images.
	await mkdir(resolve(__dirname, '..', 'src', 'img'), { recursive: true }).then(
		async () => {
			await cp(
				resolve(__dirname, '..', 'src', 'img'),
				resolve(__dirname, '..', 'dist', 'img'),
				{ recursive: true },
			)
		},
	),

	// todo: Compile fonts.
])
