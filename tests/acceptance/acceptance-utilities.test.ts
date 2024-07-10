import { describe, expect, it } from '@jest/globals'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAbsoluteFilePaths } from './acceptance-utilities.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('getAbsoluteFilePaths', () =>
	describe('when run on the directory containing this test suite', () =>
		it('should include the path to this test suite', async () =>
			expect(await getAbsoluteFilePaths(__dirname)).toContain(__filename))))
