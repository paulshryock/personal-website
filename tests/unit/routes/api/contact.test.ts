import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals'
import handler, {
	DEFAULT_HEADERS,
	Handler,
} from '../../../../src/routes/api/contact.ts'
import type {
	RecordStorage,
	StorageRecord,
} from '../../../../src/models/RecordStorage.ts'
import type { Context } from '@netlify/functions'
import { env } from 'node:process'
import site from '../../../../src/data/site.js'

const PATH = '/api/contact'
const ROUTE = `${site.origin}${PATH}/`

const httpMethods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

describe(PATH, () => {
	describe.each(httpMethods.filter((method) => method !== 'POST'))(
		'when http method is %s',
		(method) => {
			const request = new Request(ROUTE, { method })

			it('should return a 405 response status', async () =>
				expect((await handler(request, {} as Context)).status).toBe(405))

			it.each([...Object.keys(DEFAULT_HEADERS), 'Allow'])(
				'should include an %s header',
				async (header) =>
					expect(
						(await handler(request, {} as Context)).headers.get(header),
					).not.toBeNull(),
			)
		},
	)

	describe('when http method is POST', () => {
		const method = 'POST'

		describe('when an Origin header is not included', () => {
			const request = new Request(ROUTE, { method })

			it('should return a 400 response status', async () =>
				expect((await handler(request, {} as Context)).status).toBe(400))

			it.each(Object.keys(DEFAULT_HEADERS))(
				'should include an %s header',
				async (header) =>
					expect(
						(await handler(request, {} as Context)).headers.get(header),
					).not.toBeNull(),
			)
		})

		describe('when an invalid Origin header is included', () => {
			const headers = new Headers({ Origin: 'https://www.invalid-origin.com' })
			const request = new Request(ROUTE, { headers, method })

			it('should return a 400 response status', async () =>
				expect((await handler(request, {} as Context)).status).toBe(400))

			it.each(Object.keys(DEFAULT_HEADERS))(
				'should include an %s header',
				async (header) =>
					expect(
						(await handler(request, {} as Context)).headers.get(header),
					).not.toBeNull(),
			)
		})

		describe('when a valid Origin header is included', () => {
			const headers = new Headers({ Origin: site.origin })

			describe.each([
				'application/json',
				'multipart/form-data',
				'text/html',
				'text/plain',
			])('when Content-Type header is %s', (contentType) => {
				headers.set('Content-Type', contentType)

				const request = new Request(ROUTE, { headers, method })

				it('should return a 400 response status', async () =>
					expect((await handler(request, {} as Context)).status).toBe(400))

				it.each(Object.keys(DEFAULT_HEADERS))(
					'should include an %s header',
					async (header) =>
						expect(
							(await handler(request, {} as Context)).headers.get(header),
						).not.toBeNull(),
				)

				it('should return json content', async () =>
					expect(
						(await handler(request, {} as Context)).headers.get('Content-Type'),
					).toBe('application/json'))

				it('should return an error message in the body', async () =>
					expect(
						await (await handler(request, {} as Context)).json(),
					).toHaveProperty('error'))

				it.each(['allowedContentType', 'contentType'])(
					'should return a(n) %s in the body',
					async (property) =>
						expect(
							await (await handler(request, {} as Context)).json(),
						).toHaveProperty(property),
				)
			})

			describe('when Content-Type header is application/x-www-form-urlencoded', () => {
				headers.set('Content-Type', 'application/x-www-form-urlencoded')

				describe('when a body is not provided', () => {
					const request = new Request(ROUTE, { headers, method })
					const consoleError = console.error

					beforeEach(() => {
						console.error = jest.fn()
					})

					afterEach(() => {
						console.error = consoleError
					})

					it('should return a 400 response status', async () =>
						expect((await handler(request, {} as Context)).status).toBe(400))

					it.each(Object.keys(DEFAULT_HEADERS))(
						'should include an %s header',
						async (header) =>
							expect(
								(await handler(request, {} as Context)).headers.get(header),
							).not.toBeNull(),
					)

					it('should log an error to the console', async () => {
						await handler(request, {} as Context)

						expect(console.error).toHaveBeenCalled()
					})
				})

				describe('when a required field is missing or invalid', () => {
					const body = JSON.stringify({})

					it('should return a 400 response status', async () => {
						const request = new Request(ROUTE, { body, headers, method })

						expect((await handler(request, {} as Context)).status).toBe(400)
					})

					it.each(Object.keys(DEFAULT_HEADERS))(
						'should include an %s header',
						async (header) => {
							const request = new Request(ROUTE, { body, headers, method })

							expect(
								(await handler(request, {} as Context)).headers.get(header),
							).not.toBeNull()
						},
					)

					it.each([
						['an error message', 'error'],
						['the missing or invalid field', 'field'],
					])('should return %s in the body', async (_, property) => {
						const request = new Request(ROUTE, { body, headers, method })

						expect(
							await (await handler(request, {} as Context)).json(),
						).toHaveProperty(property)
					})

					it('should return json content', async () => {
						const request = new Request(ROUTE, { body, headers, method })

						expect(
							(await handler(request, {} as Context)).headers.get(
								'Content-Type',
							),
						).toBe('application/json')
					})
				})

				describe('when all required fields are valid', () => {
					const body = new URLSearchParams({
						email: 'example@example.com',
						message: 'This is an example message.',
						name: 'Example',
					})

					describe('when environment variables are not set', () => {
						const request = new Request(ROUTE, { body, headers, method })
						const consoleError = console.error

						beforeEach(() => {
							delete env.NETLIFY_AUTH_TOKEN
							delete env.NETLIFY_SITE_ID
							console.error = jest.fn()
						})

						afterEach(() => {
							console.error = consoleError
						})

						it('should return a 500 response status', async () =>
							expect((await handler(request, {} as Context)).status).toBe(500))

						it.each(Object.keys(DEFAULT_HEADERS))(
							'should include an %s header',
							async (header) =>
								expect(
									(await handler(request, {} as Context)).headers.get(header),
								).not.toBeNull(),
						)

						it('should log an error to the console', async () => {
							await handler(request, {} as Context)

							expect(console.error).toHaveBeenCalled()
						})
					})

					describe('when environment variables are set', () => {
						beforeEach(() => {
							env.NETLIFY_AUTH_TOKEN = 'some_auth_token'
							env.NETLIFY_SITE_ID = 'some_site_id'
						})

						describe('when a message is not saved to storage', () => {
							const storage: RecordStorage = {
								create: jest.fn(
									async (
										_store: string,
										_record: Record<string, unknown>,
									): Promise<StorageRecord> => {
										throw new Error('oops')
									},
								) as RecordStorage['create'],
								delete: jest.fn() as RecordStorage['delete'],
								get: jest.fn() as RecordStorage['get'],
								update: jest.fn() as RecordStorage['update'],
							}
							const consoleError = console.error

							beforeEach(() => {
								console.error = jest.fn()
							})

							afterEach(() => {
								console.error = consoleError
							})

							it('should return a 500 response status', async () => {
								const request = new Request(ROUTE, { body, headers, method })

								expect(
									(await new Handler(storage).handle(request, {} as Context))
										.status,
								).toBe(500)
							})

							it.each(Object.keys(DEFAULT_HEADERS))(
								'should include an %s header',
								async (header) => {
									const request = new Request(ROUTE, { body, headers, method })

									expect(
										(
											await new Handler(storage).handle(request, {} as Context)
										).headers.get(header),
									).not.toBeNull()
								},
							)

							it('should log an error to the console', async () => {
								await new Handler(storage).handle(
									new Request(ROUTE, { body, headers, method }),
									{} as Context,
								)

								expect(console.error).toHaveBeenCalled()
							})
						})

						describe('when a message is saved to storage', () => {
							const storage: RecordStorage = {
								create: jest.fn(
									async (
										_store: string,
										_record: Record<string, unknown>,
									): Promise<StorageRecord> => {
										return { id: 'some_id' }
									},
								) as RecordStorage['create'],
								delete: jest.fn() as RecordStorage['delete'],
								get: jest.fn() as RecordStorage['get'],
								update: jest.fn() as RecordStorage['update'],
							}

							it('should return a 200 response status', async () => {
								const request = new Request(ROUTE, { body, headers, method })

								expect(
									(await new Handler(storage).handle(request, {} as Context))
										.status,
								).toBe(200)
							})

							it.each(Object.keys(DEFAULT_HEADERS))(
								'should include an %s header',
								async (header) => {
									const request = new Request(ROUTE, { body, headers, method })

									expect(
										(
											await new Handler(storage).handle(request, {} as Context)
										).headers.get(header),
									).not.toBeNull()
								},
							)

							it('should return json content', async () => {
								const request = new Request(ROUTE, { body, headers, method })

								expect(
									(
										await new Handler(storage).handle(request, {} as Context)
									).headers.get('Content-Type'),
								).toBe('application/json')
							})

							it('should return a message in the body', async () => {
								const request = new Request(ROUTE, { body, headers, method })

								expect(
									await (
										await new Handler(storage).handle(request, {} as Context)
									).json(),
								).toHaveProperty('message')
							})
						})
					})
				})
			})
		})
	})
})
