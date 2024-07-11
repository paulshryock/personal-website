import { createServer } from 'node:http'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const PORT = 8000
export const HOST = `http://127.0.0.1:${PORT}`

export const server = createServer()

/* eslint-disable */

server.on('request', async (request, response) => {
	const path = request.url ?? ''
	const filePath = join(
		__dirname,
		'..',
		'..',
		'dist',
		path,
		path.includes('.html') ? '' : 'index.html',
	)
	const html = await readFile(filePath, 'utf8')

	response.statusCode = request.url?.includes('404') ? 404 : 200
	response.statusMessage = response.statusCode === 404 ? 'Not Found' : 'OK'
	response.end(html || response.statusMessage)
})

server.on('listening', () => {
	console.debug(`starting up server at ${HOST}`)
})

export default function setup(): void {
	server.listen(PORT)
}
