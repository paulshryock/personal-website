import { readFile } from 'node:fs/promises'

test('health check', async () => {
	expect(await readFile('./dist/health-check/index.html', 'utf8'))
		.toBe('success')
})
