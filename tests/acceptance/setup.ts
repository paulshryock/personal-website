import EleventyDevServer from '@11ty/eleventy-dev-server'

export const PORT = 666
export const HOST = `http://127.0.0.1:${PORT}`
export const server = new EleventyDevServer('test', './dist', {
	messageOnStart: () => false,
	port: PORT,
})

export default function setup(): void {
	server.serve(PORT)
}
