import type { Context } from '@netlify/functions'
import { NetlifyBlobStorage } from '../../models/NetlifyBlobStorage.ts'
import type { RecordStorage } from '../../models/RecordStorage.ts'
import site from '../../../src/data/site.js'

/**
 * Handles an HTTP request and returns a response.
 *
 * @param  {Request}           request Http request.
 * @param  {Context}           _       Netlify function context.
 * @return {Promise<Response>}         HTTP response.
 *
 * @since  unreleased
 */
export default async function handler(
	request: Request,
	_: Context,
): Promise<Response> {
	return await new Handler().handle(request, _)
}

/* eslint-disable */

// todo: Refactor and clean up.

/**
 * Default headers included in every response from this route.
 *
 * @since unreleased
 */
export const DEFAULT_HEADERS = {
	'Access-Control-Allow-Methods': 'POST',
	'Access-Control-Allow-Origin': site.origin,
	'Referrer-Policy': 'strict-origin-when-cross-origin',
} as const

export class Handler {
	#allowedContentTypes = ['application/json']
	#allowedMethods = ['POST']
	#storage: RecordStorage

	requiredFields = ['email', 'message', 'name'] as const
	responseData: Record<
		string,
		{
			bodyFields?: Record<string, unknown>
			headers?: Record<string, string>
			status: number
			statusText: string
		}
	> = {
		invalidBody: {
			bodyFields: { error: 'Invalid body.' },
			status: 400,
			statusText: 'Bad Request',
		},
		messageNotCreated: {
			status: 500,
			statusText: 'Internal Server Error',
		},
		messageReceived: {
			bodyFields: { message: 'Message received.' },
			status: 200,
			statusText: 'OK',
		},
		methodNotAllowed: {
			headers: { Allow: this.#allowedMethods.join(',') },
			status: 405,
			statusText: 'Method Not Allowed',
		},
		originNotAllowed: {
			status: 400,
			statusText: 'Bad Request',
		},
	}

	/**
	 * Constructs a contact handler.
	 *
	 * @param {RecordStorage} storage Storage for storing message records.
	 * @since unreleased
	 */
	public constructor(_storage: RecordStorage = new NetlifyBlobStorage()) {
		this.#storage = _storage
	}

	/**
	 * Handles an HTTP request and returns a response.
	 *
	 * @param  {Request}           request Http request.
	 * @param  {Context}           _       Netlify function context.
	 * @return {Promise<Response>}         HTTP response.
	 *
	 * @since  unreleased
	 */
	public async handle(request: Request, _: Context): Promise<Response> {
		if (!this.#validateMethod(request))
			return this.#getResponse(this.responseData.methodNotAllowed)

		if (!this.#validateOrigin(request))
			return this.#getResponse(this.responseData.originNotAllowed)

		if (!this.#validateContentType(request))
			return new Response(
				JSON.stringify({
					allowedContentType: 'application/json',
					contentType: request.headers.get('Content-Type'),
					error: 'Invalid Content-Type header.',
					status: 400,
					statusText: 'Bad Request',
				}),
				{
					headers: new Headers(DEFAULT_HEADERS),
					status: 400,
				},
			)

		let body: Record<(typeof this.requiredFields)[number], string>

		try {
			body = await request.json()
		} catch (error) {
			console.error(error)
			return this.#getResponse(this.responseData.invalidBody)
		}

		for (const field of this.requiredFields)
			if (!(field in body))
				return new Response(
					JSON.stringify({
						field,
						error: 'Missing or invalid field.',
						status: 400,
						statusText: 'Bad Request',
					}),
					{
						headers: new Headers(DEFAULT_HEADERS),
						status: 400,
					},
				)

		try {
			await this.#storeMessage(body)
		} catch (error) {
			/* istanbul ignore next */
			console.error(error)
			/* istanbul ignore next */
			return this.#getResponse(this.responseData.messageNotCreated)
		}

		return this.#getResponse(this.responseData.messageReceived)
	}

	/**
	 * Gets an HTTP response object to return.
	 *
	 * @param  {typeof this.responses[keyof typeof this.responses]} response Response data.
	 * @return {Response}                                                    HTTP response to return.
	 *
	 * @since  unreleased
	 */
	#getResponse(
		response: (typeof this.responseData)[keyof typeof this.responseData],
	): Response {
		const body =
			'bodyFields' in response
				? JSON.stringify({
						...response.bodyFields,
						status: response.status,
						statusText: response.statusText,
					})
				: response.statusText
		return new Response(body, {
			headers: new Headers({ ...DEFAULT_HEADERS, ...(response.headers ?? {}) }),
			status: response.status,
		})
	}

	/**
	 * Stores a message.
	 *
	 * @param  {Record<string, unknown>} _ HTTP request body JSON.
	 * @return {Promise<void>}
	 * @since  unreleased
	 * @todo
	 */
	async #storeMessage(body: Record<string, unknown>): Promise<void> {
		await this.#storage.create('messages', body)
	}

	/**
	 * Validates the Content-Type header of an HTTP request.
	 *
	 * @param  {Request} request The HTTP request.
	 * @return {boolean}         Whether the Content-Type header is valid.
	 * @since  unreleased
	 */
	#validateContentType(request: Request): boolean {
		return this.#allowedContentTypes.includes(
			`${request.headers.get('Content-Type')}`,
		)
	}

	/**
	 * Validates an HTTP request method.
	 *
	 * @param  {Request} request The HTTP request.
	 * @return {boolean}         Whether the request method is valid.
	 * @since  unreleased
	 */
	#validateMethod(request: Request): boolean {
		return this.#allowedMethods.includes(request.method)
	}

	/**
	 * Validates the Origin header of an HTTP request.
	 *
	 * @param  {Request} request The HTTP request.
	 * @return {boolean}         Whether the Origin header is valid.
	 * @since  unreleased
	 */
	#validateOrigin(request: Request): boolean {
		return request.headers.get('Origin') === site.origin
	}
}
