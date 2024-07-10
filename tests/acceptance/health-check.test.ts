import { beforeEach, describe, expect, test } from '@jest/globals'
import { HOST } from './setup.ts'

describe('should return a 200 status code', () => {
	let response: Response

	beforeEach(
		async () =>
			(response = await fetch(new URL('/health-check/', HOST), {
				method: 'GET',
			})),
	)

	test('GET /health-check/', () => expect(response.status).toBe(200))
})
