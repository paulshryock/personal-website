import type { Config } from 'jest'

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['bin/**/*', 'src/**/*'],
	coverageDirectory: 'coverage',
	coverageProvider: 'babel',
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	errorOnDeprecated: true,
	extensionsToTreatAsEsm: ['.ts'],
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	testPathIgnorePatterns: ['/tests/acceptance/'],
}

export default config
