import { getAbsoluteFilePaths } from './acceptance-utilities.js'

it('should recursively get all absolute file paths in a directory', async () => {
	await expect(getAbsoluteFilePaths(__dirname)).resolves.toContain(__filename)
})

export {}
