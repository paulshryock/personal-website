import type { Context } from '@netlify/functions'

/**
 * Says hello.
 *
 * @param  {Request}  request HTTP request.
 * @param  {Context}  context Netlify function context.
 * @return {Response}         HTTP response.
 * @since  unreleased
 */
export default function hello(request: Request, context: Context): Response {
	return new Response(JSON.stringify({ context, request }), {
		status: 200,
		statusText: 'OK',
	})
}
