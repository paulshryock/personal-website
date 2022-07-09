import { resolve } from 'path'
import { readdir } from 'fs/promises'

/**
 * Gets all absolute paths of HTML files except for health check endpoint.
 *
 * @since  unreleased
 * @param  {string}            directory Relative directory path.
 * @return {Promise<string[]>}           Absolute file paths.
 */
export async function getAbsoluteFilePaths(
	directory: string,
): Promise<string[]> {
	const filePaths = await Promise.all(
		(
			await readdir(directory, { withFileTypes: true })
		).map((dirent) => {
			const res = resolve(directory, dirent.name)
			return dirent.isDirectory() ? getAbsoluteFilePaths(res) : res
		}),
	)

	return Array.prototype.concat(...filePaths)
}
