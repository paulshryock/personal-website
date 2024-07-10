import { readdir } from 'fs/promises'
import { resolve } from 'path'

/**
 * Recursively gets all absolute file paths in a directory.
 *
 * @since  0.1.0
 * @param  {string}            directory Absolute directory path.
 * @return {Promise<string[]>}           Absolute file paths.
 */
export async function getAbsoluteFilePaths(
	directory: string,
): Promise<string[]> {
	const contents = await readdir(directory, { withFileTypes: true })
	const filePaths = await Promise.all(
		contents.map((dirent) => {
			const res = resolve(directory, dirent.name)
			return dirent.isDirectory() ? getAbsoluteFilePaths(res) : res
		}),
	)

	return filePaths.flat()
}
