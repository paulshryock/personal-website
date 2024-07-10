import { server } from './setup.ts'

export default function teardown(): void {
	server.close()
}
