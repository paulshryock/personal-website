import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
	bail: true,
	collectCoverage: false,
	collectCoverageFrom: ['src/ts', 'src/js'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	extensionsToTreatAsEsm: ['.ts', '.test.ts'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			useESM: true,
		},
	},
	preset: 'ts-jest/presets/default-esm',
	resolver: 'jest-ts-webcompat-resolver',
	testEnvironment: 'node',
	transform: {},
	verbose: true,
}

export default config
