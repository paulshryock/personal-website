import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { getAbsoluteFilePaths } from './acceptance-utilities.ts'
import { HOST } from './setup.ts'
import { parse } from 'node-html-parser'

const HTML_FILE_PATHS: string[] = (await getAbsoluteFilePaths('./dist')).filter(
	(filePath) => /\.html$/u.exec(filePath) && !filePath.includes('health-check'),
)

const PATHS = HTML_FILE_PATHS.map((path) =>
	path.replace(/.*dist\//u, '/').replace(/\/index\.html/u, '/'),
)

const TITLE_MINIMUM_LENGTH = 30
const TITLE_MAXIMUM_LENGTH = 60

const DESCRIPTION_MINIMUM_LENGTH = 120
const DESCRIPTION_MAXIMUM_LENGTH = 160

beforeAll(() => {
	if (HTML_FILE_PATHS.length === 0)
		throw new Error('no compiled html files found')
})

describe.each(PATHS)('GET %s', (path: string) => {
	let response: Response

	beforeEach(
		async () =>
			(response = await fetch(new URL(path, HOST), { method: 'GET' })),
	)

	describe('<title> element', () => {
		let title: string

		beforeEach(
			async () =>
				(title =
					(
						parse(await response.text()).querySelector(
							'title',
						) as unknown as HTMLTitleElement
					).textContent ?? ''),
		)

		it(`should be at least ${TITLE_MINIMUM_LENGTH} characters`, () =>
			expect(title.length).toBeGreaterThan(TITLE_MINIMUM_LENGTH))

		it(`should be less than ${TITLE_MAXIMUM_LENGTH} characters`, () =>
			expect(title.length).toBeLessThan(TITLE_MAXIMUM_LENGTH))
	})

	describe(`<meta name="description"> element's "content" attribute`, () => {
		let description: string

		beforeEach(async () => {
			description =
				(
					parse(await response.text()).querySelector(
						'meta[name="description"]',
					) as unknown as HTMLMetaElement
				).getAttribute('content') ?? ''
		})

		it(`should be at least ${DESCRIPTION_MINIMUM_LENGTH} characters`, () =>
			expect(description.length).toBeGreaterThan(DESCRIPTION_MINIMUM_LENGTH))

		it(`should be less than ${DESCRIPTION_MAXIMUM_LENGTH} characters`, () =>
			expect(description.length).toBeLessThan(DESCRIPTION_MAXIMUM_LENGTH))

		it(`should not end with an elipsis`, () =>
			expect(description).not.toMatch(/\.\.\.$/u))
	})
})
