import { getAbsoluteFilePaths } from '../lib.js'
import { readFile } from 'node:fs/promises'
import { promisify } from 'node:util'
import { gzip } from 'node:zlib'

test('gzipped html files fit in a single TCP packet', async () => {
	const gzipAsync = promisify(gzip)
	const packetSize = 14000
	const packetWarnSize = packetSize - 2000

	const files = await Promise.all(
		(
			await getAbsoluteFilePaths('./dist')
		)
			.filter((filePath) => filePath.match(/\.html$/))
			.map(async (filePath) => {
				const content = await readFile(filePath, 'utf8')
				const gzipped = await gzipAsync(content, { level: 9 })
				return {
					filePath,
					gzippedLength: gzipped.length,
				}
			}),
	)

	const filesToWarn = files.filter(
		(file) => file.gzippedLength > packetWarnSize,
	)
	if (filesToWarn.length > 0) {
		console.warn(
			'gzipped html files are getting close to single TCP packet size limit: ' +
				'%s',
			filesToWarn.map(
				(file) => `${file.filePath}
`,
			),
		)
	}

	const filesTooLarge = files.filter((file) => file.gzippedLength > packetSize)
	if (filesTooLarge.length > 0) {
		console.error(
			'gzipped html files are over single TCP packet size limit: ' + '%s',
			filesTooLarge.map(
				(file) => `${file.filePath}
`,
			),
		)
	}

	expect(filesTooLarge.length).not.toBeGreaterThan(0)
})
