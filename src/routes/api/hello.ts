import type { Context } from '@netlify/functions'

/**
 * Returns request information.
 *
 * @param  {Request}  request  HTTP request.
 * @param  {Context}  _context Netlify function context.
 * @return {Response} HTTP response.
 * @since  unreleased
 */
export default function hello(request: Request, _context: Context): Response {
	return new Response(
		JSON.stringify({
			body: request.body,
			headers: request.headers,
			method: request.method,
			request,
		}),
		{ status: 200, statusText: 'OK' },
	)
}
