import type { Config } from 'jest'

const config: Config = {
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: ['bin/**/*', 'src/**/*'],
	coverageDirectory: 'coverage',
	coverageProvider: 'babel',
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
	errorOnDeprecated: true,
	extensionsToTreatAsEsm: ['.ts'],
	testMatch: ['<rootDir>/tests/**/*.test.ts'],
	testPathIgnorePatterns: ['/tests/acceptance/'],
}

export default config
