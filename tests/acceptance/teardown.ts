import { HOST, server } from './setup.ts'

export default function teardown(): void {
	/* eslint-disable-next-line no-console -- This is fine. */
	server.close(() => console.debug(`shutting down server at ${HOST}`))
}
