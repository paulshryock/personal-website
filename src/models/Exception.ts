interface Options {
	cause?: unknown
}

/**
 * An exceptional error event which should be handled.
 *
 * @since unreleased
 * @see   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
export class Exception extends Error {
	/**
	 * Constructs an Exception instance.
	 *
	 * @param {string|undefined}  message Human-readable description.
	 * @param {Options|undefined} options Object with exception cause.
	 * @since unreleased
	 */
	public constructor(message?: string, options?: Options) {
		super(message, options)

		this.name = this.constructor.name
	}
}
