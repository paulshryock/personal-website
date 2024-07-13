import { describe, expect, it } from '@jest/globals'
import type { Context } from '@netlify/functions'
import hello from '../../../../src/routes/api/hello.ts'

describe('GET /api/hello', () => {
	it('should return a response', () =>
		expect(hello({} as Request, {} as Context)).toBeInstanceOf(Response))

	it('should return a 200 status code', () =>
		expect(hello({} as Request, {} as Context).status).toBe(200))

	it('should return response text of "Hello, world!"', async () =>
		expect(await hello({} as Request, {} as Context).text()).toBe(
			'Hello, world!',
		))
})
