import { HOST } from './setup.ts'
import { parse } from 'node-html-parser'
import { readdir } from 'fs/promises'
import { resolve } from 'path'

/**
 * Makes a GET request to the given path, parses the response text, and returns
 * the root HTML element.
 *
 * @param  {string}               path Path to fetch.
 * @return {Promise<HTMLElement>}      Root element.
 * @since  unreleased
 */
export async function fetchPathAndGetRootElement(
	path: string,
): Promise<HTMLElement> {
	return await fetch(new URL(path, HOST), { method: 'GET' })
		.then((response: Response) => response.text())
		.then((text: string) => parse(text) as unknown as HTMLElement)
}

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

/**
 * Gets file paths to all compiled HTML files in the dist directory.
 *
 * @return {Promise<string[]>} File paths.
 * @since  unreleased
 */
export async function getHtmlFilePaths(): Promise<string[]> {
	return (await getAbsoluteFilePaths('./dist')).filter((filePath) =>
		/\.html$/u.exec(filePath),
	)
}

/**
 * Gets URL paths from a list of a HTML file paths.
 *
 * @param  {string[]} filePaths HTML file paths.
 * @return {string[]}           URL paths.
 * @since  unreleased
 */
export function getUrlPaths(filePaths: string[]): string[] {
	return filePaths.map((path) =>
		path.replace(/.*dist\//u, '/').replace(/\/index\.html/u, '/'),
	)
}
