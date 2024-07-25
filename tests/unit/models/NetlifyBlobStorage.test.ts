import '@netlify/blobs'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { env } from 'node:process'
import { NetlifyBlobStorage } from '../../../src/models/NetlifyBlobStorage.ts'

describe('scenario: creating a record in storage', () => {
	describe('when required environment variables are not set', () => {
		beforeEach(() => {
			delete env.NETLIFY_AUTH_TOKEN
			delete env.NETLIFY_SITE_ID
		})

		it('should throw an error', () =>
			expect(() =>
				new NetlifyBlobStorage().create('store', { hello: 'world' }),
			).rejects.toThrow(Error))
	})

	describe('when required environment variables are set', () => {
		beforeEach(() => {
			env.NETLIFY_AUTH_TOKEN = 'some_auth_token'
			env.NETLIFY_SITE_ID = 'some_site_id'
		})

		const store = 'my_store'
		const record = { hello: 'world' }

		describe('when a record is not stored successfully', () => {
			beforeEach(() => {
				const mockResponse = new Response('Internal Server Error', {
					status: 500,
				})

				global.fetch = jest.fn(() => Promise.resolve(mockResponse))
			})

			it('should throw an error', () =>
				expect(() =>
					new NetlifyBlobStorage().create(store, record),
				).rejects.toThrow(Error))
		})

		describe('when a record is stored successfully', () => {
			beforeEach(() => {
				const mockResponse = new Response(JSON.stringify({ url: 'some_url' }), {
					headers: new Headers({
						connection: 'keep-alive',
						'content-length': '18',
						'content-type': 'application/json',
						date: 'Wed, 24 Jul 2024 00:00:00 GMT',
						'netlify-blobs-region': 'aa-bbbb-1',
						'x-nf-request-id': 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
						'x-nf-srv-version': 'aaaaaaa',
					}),
					status: 200,
				})

				global.fetch = jest.fn(() => Promise.resolve(mockResponse))
			})

			it('should return the stored record', async () =>
				expect(
					await new NetlifyBlobStorage().create(store, record),
				).toMatchObject(record))

			it.each(['dateTimeUtc', 'id'])(
				'should include a "%s" property',
				async (property) =>
					expect(
						await new NetlifyBlobStorage().create(store, record),
					).toHaveProperty(property),
			)
		})
	})
})
