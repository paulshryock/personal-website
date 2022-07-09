import { readFile } from 'node:fs/promises'

test('health check', async () => {
	const actual = await readFile('./dist/health-check/index.html', 'utf8')
	expect(actual).toBe('success')
})
