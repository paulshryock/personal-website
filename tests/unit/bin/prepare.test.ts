import { test } from '@jest/globals'

/* eslint-disable multiline-comment-style -- todo */
/* eslint-disable no-warning-comments -- todo */

// import { beforeEach, describe, expect, it, jest } from '@jest/globals'
// import process from 'node:process'
// import { dirname, resolve } from 'node:path'
// import { fileURLToPath } from 'url'

// const __dirname = dirname(fileURLToPath(import.meta.url))

// // eslint-disable-next-line no-var -- var is hoisted with jest.mock.
// var mockInstall = jest.fn()

// // jest.mock('husky', () => mockInstall)

// const PROCESS_ENV_ORIGINAL = process.env
// const FILE_PATH = resolve(__dirname, '../../../bin/prepare.ts')

// beforeEach(() => {
// 	process.env = PROCESS_ENV_ORIGINAL
// 	jest.resetModules()
// })

// describe('given ci environment variable is not defined', () => {
// 	beforeEach(() => {
// 		delete process.env.CI
// 	})

// 	describe('when prepare script runs', () => {
// 		beforeEach(async () => {
// 			await import(FILE_PATH)
// 		})

// 		it('should install husky', () =>
// 			expect(mockInstall).toHaveBeenCalledTimes(1))
// 	})
// })

// describe('given ci environment variable is "true"', () => {
// 	beforeEach(() => {
// 		process.env.CI = 'true'
// 	})

// 	describe('when prepare script runs', () => {
// 		beforeEach(async () => {
// 			await import(FILE_PATH)
// 		})

// 		it('should not install husky', () =>
// 			expect(mockInstall).toHaveBeenCalledTimes(0))
// 	})
// })

// todo: fix the suite above, 'require' is not defined.

test.todo('fix the tests in this suite')
