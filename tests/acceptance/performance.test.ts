import { beforeAll, describe, expect, test } from '@jest/globals'
import { getAbsoluteFilePaths } from './acceptance-utilities.ts'
import { gzip } from 'node:zlib'
import { promisify } from 'node:util'
import { readFile } from 'node:fs/promises'

const HTML_FILE_PATHS: string[] = (await getAbsoluteFilePaths('./dist')).filter(
	(filePath) => /\.html$/u.exec(filePath),
)

beforeAll(() => {
	if (HTML_FILE_PATHS.length === 0)
		throw new Error('no compiled html files found')
})

describe.each(HTML_FILE_PATHS)('compiled html files', (filePath) => {
	const filePathShort = filePath.replace(/.*\/dist/u, './dist')

	describe('should not exceed tcp packet size when gzipped', () => {
		const TCP_PACKET_SIZE = 14000
		const TCP_PACKET_WARN_SIZE = TCP_PACKET_SIZE - 2000
		/** @see https://zlib.net/manual.html#Constants */
		const Z_BEST_COMPRESSION = 9

		test(filePathShort, async () => {
			const fileContent = await readFile(filePath, 'utf8')
			const gzipped = await promisify(gzip)(fileContent, {
				level: Z_BEST_COMPRESSION,
			})

			if (gzipped.length >= TCP_PACKET_WARN_SIZE) {
				// eslint-disable-next-line no-console
				console.warn(
					`${filePathShort} (${gzipped.length}) is too close to tcp packet size (${TCP_PACKET_SIZE}). reduce file size.`,
				)
			}

			expect(gzipped.length).toBeLessThan(TCP_PACKET_SIZE)
		})
	})
})
