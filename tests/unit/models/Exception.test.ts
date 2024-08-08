import { describe, expect, it } from '@jest/globals'
import { Exception } from '../../../src/models/Exception.ts'

describe('an exception', () => {
	const exception = new Exception('Something went wrong.')

	it('should refer to itself as an exception', () =>
		expect(exception.toString()).toMatch(/^Exception: /u))

	it('should be a type of error', () => expect(exception).toBeInstanceOf(Error))
})
