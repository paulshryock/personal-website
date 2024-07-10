import jestConfig from './jest.config.ts'

export default {
	...jestConfig,
	collectCoverage: false,
	globalSetup: './tests/acceptance/setup.ts',
	globalTeardown: './tests/acceptance/teardown.ts',
	testPathIgnorePatterns: ['/tests/unit/'],
}
