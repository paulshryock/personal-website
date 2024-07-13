import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import {
	fetchPathAndGetRootElement,
	getHtmlFilePaths,
	getUrlPaths,
} from './acceptance-utilities.ts'

const URL_PATHS = getUrlPaths(await getHtmlFilePaths()).filter(
	(path) => !path.includes('health-check'),
)

beforeAll(() => {
	if (URL_PATHS.length === 0) throw new Error('no compiled html files found')
})

describe.each(URL_PATHS)('GET %s', (path: string) => {
	let rootElement: HTMLElement

	beforeEach(async () => (rootElement = await fetchPathAndGetRootElement(path)))

	it('should skip to main content via the first link in the document', () => {
		expect(rootElement.querySelector('a')?.getAttribute('href') ?? '').toBe(
			'#main',
		)
	})
})
