import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals'
import createMessage, {
	DEFAULT_HEADERS,
} from '../../../../src/routes/api/contact.ts'
import type { Context } from '@netlify/functions'
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
				expect((await createMessage(request, {} as Context)).status).toBe(405))

			it.each([...Object.keys(DEFAULT_HEADERS), 'Allow'])(
				'should include an %s header',
				async (header) =>
					expect(
						(await createMessage(request, {} as Context)).headers.get(header),
					).not.toBeNull(),
			)
		},
	)

	describe('when http method is POST', () => {
		const method = 'POST'

		describe('when an Origin header is not included', () => {
			const request = new Request(ROUTE, { method })

			it('should return a 400 response status', async () =>
				expect((await createMessage(request, {} as Context)).status).toBe(400))

			it.each(Object.keys(DEFAULT_HEADERS))(
				'should include an %s header',
				async (header) =>
					expect(
						(await createMessage(request, {} as Context)).headers.get(header),
					).not.toBeNull(),
			)
		})

		describe('when an invalid Origin header is included', () => {
			const headers = new Headers({ Origin: 'https://www.invalid-origin.com' })
			const request = new Request(ROUTE, { headers, method })

			it('should return a 400 response status', async () =>
				expect((await createMessage(request, {} as Context)).status).toBe(400))

			it.each(Object.keys(DEFAULT_HEADERS))(
				'should include an %s header',
				async (header) =>
					expect(
						(await createMessage(request, {} as Context)).headers.get(header),
					).not.toBeNull(),
			)
		})

		describe('when a valid Origin header is included', () => {
			const headers = new Headers({ Origin: site.origin })

			describe.each([
				'application/x-www-form-urlencoded',
				'multipart/form-data',
				'text/html',
				'text/plain',
			])('when Content-Type header is %s', (contentType) => {
				headers.set('Content-Type', contentType)

				const request = new Request(ROUTE, { headers, method })

				it('should return a 400 response status', async () =>
					expect((await createMessage(request, {} as Context)).status).toBe(
						400,
					))

				it.each(Object.keys(DEFAULT_HEADERS))(
					'should include an %s header',
					async (header) =>
						expect(
							(await createMessage(request, {} as Context)).headers.get(header),
						).not.toBeNull(),
				)

				it('should return an error message in the body', async () =>
					expect(
						await (await createMessage(request, {} as Context)).json(),
					).toHaveProperty('error'))

				it.each(['allowedContentType', 'contentType'])(
					'should return a(n) %s in the body',
					async (property) =>
						expect(
							await (await createMessage(request, {} as Context)).json(),
						).toHaveProperty(property),
				)
			})

			describe('when Content-Type header is application/json', () => {
				headers.set('Content-Type', 'application/json')

				describe('when a valid json body is not provided', () => {
					const request = new Request(ROUTE, { headers, method })
					const consoleError = console.error

					beforeEach(() => {
						console.error = jest.fn()
					})

					afterEach(() => {
						console.error = consoleError
					})

					it('should return a 400 response status', async () =>
						expect((await createMessage(request, {} as Context)).status).toBe(
							400,
						))

					it.each(Object.keys(DEFAULT_HEADERS))(
						'should include an %s header',
						async (header) =>
							expect(
								(await createMessage(request, {} as Context)).headers.get(
									header,
								),
							).not.toBeNull(),
					)

					it('should log an error to the console', async () => {
						await createMessage(request, {} as Context)

						expect(console.error).toHaveBeenCalled()
					})
				})

				describe('when a required field is missing or invalid', () => {
					const body = JSON.stringify({})

					it('should return a 400 response status', async () => {
						const request = new Request(ROUTE, { body, headers, method })

						expect((await createMessage(request, {} as Context)).status).toBe(
							400,
						)
					})

					it.each(Object.keys(DEFAULT_HEADERS))(
						'should include an %s header',
						async (header) => {
							const request = new Request(ROUTE, { body, headers, method })

							expect(
								(await createMessage(request, {} as Context)).headers.get(
									header,
								),
							).not.toBeNull()
						},
					)

					it.each([
						['an error message', 'error'],
						['the missing or invalid field', 'field'],
					])('should return %s in the body', async (_, property) => {
						const request = new Request(ROUTE, { body, headers, method })

						expect(
							await (await createMessage(request, {} as Context)).json(),
						).toHaveProperty(property)
					})
				})

				describe('when all required fields are valid', () => {
					const body = JSON.stringify({
						email: 'example@example.com',
						message: 'This is an example message.',
						name: 'Example',
					})

					// eslint-disable-next-line no-warning-comments -- Temporary.
					// todo: unskip when this is complete.
					describe.skip('when a message is not saved to storage', () => {
						it('should return a 500 response status', async () => {
							const request = new Request(ROUTE, { body, headers, method })

							expect((await createMessage(request, {} as Context)).status).toBe(
								500,
							)
						})

						it.each(Object.keys(DEFAULT_HEADERS))(
							'should include an %s header',
							async (header) => {
								const request = new Request(ROUTE, { body, headers, method })

								expect(
									(await createMessage(request, {} as Context)).headers.get(
										header,
									),
								).not.toBeNull()
							},
						)
					})

					describe('when a message is saved to storage', () => {
						it('should return a 200 response status', async () => {
							const request = new Request(ROUTE, { body, headers, method })

							expect((await createMessage(request, {} as Context)).status).toBe(
								200,
							)
						})

						it.each(Object.keys(DEFAULT_HEADERS))(
							'should include an %s header',
							async (header) => {
								const request = new Request(ROUTE, { body, headers, method })

								expect(
									(await createMessage(request, {} as Context)).headers.get(
										header,
									),
								).not.toBeNull()
							},
						)

						it('should return a message in the body', async () => {
							const request = new Request(ROUTE, { body, headers, method })

							expect(
								await (await createMessage(request, {} as Context)).json(),
							).toHaveProperty('message')
						})
					})
				})
			})
		})
	})
})
