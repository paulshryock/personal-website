import type { Context } from '@netlify/functions'
import site from '../../../src/data/site.js'

/* eslint-disable */

/**
 * Creates a message from an HTTP request.
 *
 * @param  {Request}           request  Http request.
 * @param  {Context}           _context Netlify function context.
 * @return {Promise<Response>}          HTTP response.
 *
 * @since  unreleased
 */
export default async function createMessage(
	request: Request,
	_context: Context,
): Promise<Response> {
	const defaultHeaders = {
		'Access-Control-Allow-Methods': 'POST',
		'Access-Control-Allow-Origin': site.origin,
	}

	if (request.method !== 'POST')
		return new Response('Method Not Allowed', {
			headers: new Headers({ ...defaultHeaders, Allow: 'POST' }),
			status: 405,
		})

	if (request.headers.get('Origin') !== site.origin)
		return new Response('Bad Request', {
			headers: new Headers(defaultHeaders),
			status: 400,
		})

	const contentType = request.headers.get('Content-Type')

	if (contentType !== 'application/json')
		return new Response(
			JSON.stringify({
				allowedContentType: 'application/json',
				contentType,
				error: 'Invalid Content-Type header.',
				status: 400,
				statusText: 'Bad Request',
			}),
			{
				headers: new Headers(defaultHeaders),
				status: 400,
			},
		)

	const fields = await request.json()
	const requiredFields = ['email', 'message', 'name']

	for (const field of requiredFields) {
		if (!(field in fields))
			return new Response(
				JSON.stringify({
					field,
					error: 'Missing or invalid field.',
					status: 400,
					statusText: 'Bad Request',
				}),
				{
					headers: new Headers(defaultHeaders),
					status: 400,
				},
			)
	}

	// todo: create message, add try/catch
	const messageWasCreated = true // todo: createMessage(), returns boolean

	/* istanbul ignore next */
	if (!messageWasCreated)
		return new Response('Internal Server Error', {
			headers: new Headers(defaultHeaders),
			status: 500,
		})

	return new Response(
		JSON.stringify({
			message: 'Message received.',
			status: 200,
			statusText: 'OK',
		}),
		{
			headers: new Headers(defaultHeaders),
			status: 200,
		},
	)
}
