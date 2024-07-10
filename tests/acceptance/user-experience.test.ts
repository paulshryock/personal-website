import { beforeEach, describe, expect, it } from '@jest/globals'
import { HOST } from './setup.ts'
import navigation from '../../src/data/navigation.js'
import { parse } from 'node-html-parser'

describe.each(['/', ...navigation.items.map((item) => item.link)])(
	'GET %s',
	(path: string) => {
		let response: Response

		beforeEach(
			async () =>
				(response = await fetch(new URL(path, HOST), { method: 'GET' })),
		)

		it('should return a 200 status code', () =>
			expect(response.status).toBe(200))

		it('should have at least one navigation list item', async () =>
			expect(
				parse(await response.text()).querySelectorAll('nav ul li').length,
			).toBeGreaterThan(0))
	},
)
