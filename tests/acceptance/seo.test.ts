import { getAbsoluteFilePaths } from '../lib.js'
import { readFile } from 'fs/promises'
import { parse } from 'node-html-parser'

interface Context {
	files?: string[]
	navigation?: {
		[key: string]: {
			items: {
				link: string
				label: string
			}[]
		}
	}
}

describe('seo', () => {
	const context: Context = {}

	beforeAll(async () => {
		const files = (await getAbsoluteFilePaths('./dist')).filter((filePath) =>
			filePath.match(/(?<!health-check\/index)\.html$/),
		)
		const navigation = JSON.parse(
			await readFile('./src/data/navigation.json', 'utf8'),
		)
		Object.assign(context, { files, navigation })
	})

	it('has rendered at least 1 html file', () => {
		expect(context?.files?.length).toBeGreaterThan(0)
	})

	it('has rendered the home page', () => {
		expect(
			context?.files?.find((file) => file.match(/dist\/index\.html$/)),
		).not.toBeUndefined()
	})

	it('has at least 1 navigation item', () => {
		const items = context?.navigation?.primary?.items
		expect(items?.length).toBeGreaterThan(0)
	})

	it('has pages for each navigation item', () => {
		const actual =
			context?.files?.map((file) => {
				return file.replace(/.*\/dist(\/.*)\/index.html/, '$1')
			}) ?? []
		const items =
			context?.navigation?.primary?.items.map((item) => item.link) ?? []

		expect(actual).toEqual(expect.arrayContaining(items))
	})

	it('has correct seo title and description lengths', async () => {
		expect.hasAssertions()
		expect.assertions(parseInt(`${context?.files?.length}`) * 3 * 2)

		await Promise.all([
			...(context?.files?.map(async (file: string) => {
				const content = parse(await readFile(file, 'utf8'))
				const title = content?.querySelector('title')?.textContent ?? ''
				const description =
					content
						?.querySelector('meta[name="description"]')
						?.getAttribute('content') ?? ''

				const metas = [
					{
						name: 'title',
						content: title,
						lengths: { min: 30, max: 60 },
					},
					{
						name: 'description',
						content: description,
						lengths: { min: 120, max: 160 },
					},
				]

				metas.forEach((meta) => {
					expect(meta.content?.length).toBeGreaterThan(meta.lengths.min)
					expect(meta.content?.length).toBeLessThan(meta.lengths.max)
					expect(meta.content?.endsWith('...')).toBe(false)
				})
			}) ?? []),
		])
	})
})
