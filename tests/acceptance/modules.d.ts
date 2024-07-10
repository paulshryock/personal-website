declare module '@11ty/eleventy-dev-server' {
	export default class EleventyDevServer {
		public constructor(
			name: string,
			dir: string,
			options: {
				messageOnStart: () => string | false
				port: number
			},
		)
		public serve(port: number): void
		public close(): void
	}
}
