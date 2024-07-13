import type { Context } from '@netlify/functions'

/**
 * Says hello.
 *
 * @param  {Request}  _request HTTP request.
 * @param  {Context}  _context Netlify function context.
 * @return {Response}          HTTP response.
 * @since  unreleased
 */
export default function hello(_request: Request, _context: Context): Response {
	return new Response('Hello, world!', { status: 200, statusText: 'OK' })
}
