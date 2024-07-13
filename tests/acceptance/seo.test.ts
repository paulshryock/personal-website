import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import {
	fetchPathAndGetRootElement,
	getHtmlFilePaths,
	getUrlPaths,
} from './acceptance-utilities.ts'

const URL_PATHS = getUrlPaths(await getHtmlFilePaths()).filter(
	(path) => !path.includes('health-check'),
)

const TITLE_MINIMUM_LENGTH = 30
const TITLE_MAXIMUM_LENGTH = 60

const DESCRIPTION_MINIMUM_LENGTH = 120
const DESCRIPTION_MAXIMUM_LENGTH = 160

beforeAll(() => {
	if (URL_PATHS.length === 0) throw new Error('no compiled html files found')
})

describe.each(URL_PATHS)('GET %s', (path: string) => {
	let rootElement: HTMLElement

	beforeEach(async () => (rootElement = await fetchPathAndGetRootElement(path)))

	describe('<title> element', () => {
		let title: string

		beforeEach(() => {
			title =
				(rootElement.querySelector('title') as unknown as HTMLTitleElement)
					.textContent ?? ''
		})

		it(`should be at least ${TITLE_MINIMUM_LENGTH} characters`, () =>
			expect(title.length).toBeGreaterThan(TITLE_MINIMUM_LENGTH))

		it(`should be less than ${TITLE_MAXIMUM_LENGTH} characters`, () =>
			expect(title.length).toBeLessThan(TITLE_MAXIMUM_LENGTH))
	})

	describe(`<meta name="description"> element's "content" attribute`, () => {
		let description: string

		beforeEach(() => {
			description =
				(
					rootElement.querySelector(
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
