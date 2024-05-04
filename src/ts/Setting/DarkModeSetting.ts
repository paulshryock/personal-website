import { Setting } from './Setting.js'

const META_SELECTOR = '[name="color-scheme"]'

/**
 * Logs messages.
 *
 * @todo Replace with a real logger.
 * @todo Inject a Console dependency, etc.
 */
class Logger {
	public debug(...args: unknown[]): void {
		console.debug(...args)
	}
}

/**
 * Dark mode is a user interface display setting which prioritizes light text
 * on dark backgrounds.
 *
 * @sealed
 * @since 0.2.3
 * @todo  Nest name and value inside query
 * @todo  Add name "darkMode"
 * @todo  Remove logging
 * @todo  Add isActive property, set in constructor, activate, deactivate
 * @todo  Handle logging in application
 */
export class DarkModeSetting extends Setting {
	#logger: Logger

	/**
	 * Name of setting.
	 *
	 * @type  {string}
	 * @since 0.2.3
	 */
	public readonly name: string = 'prefers-color-scheme'

	/**
	 * Value of setting.
	 *
	 * @type  {string}
	 * @since 0.2.3
	 */
	public readonly value: string = 'dark'

	public constructor(logger: Logger = new Logger()) {
		super()

		this.#logger = logger
	}

	/**
	 * Checks if dark mode is currently active.
	 *
	 * @return {boolean} Whether or not dark mode is currently active.
	 * @since  0.2.3
	 */
	public isActive(): boolean {
		return (
			((
				document.querySelector(META_SELECTOR) as HTMLMetaElement
			)?.content?.split(' ')?.[0] ?? '') === this.value
		)
	}

	/**
	 * Activates dark mode.
	 *
	 * Side effect: Modifies the DOM.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public activate(): void {
		const meta = document.querySelector(META_SELECTOR) as HTMLMetaElement
		const content = 'dark light'

		if (meta) meta.setAttribute('content', content)
		else this.#appendMetaToHead(content)

		this.#logger.debug({ darkMode: true })
	}

	/**
	 * Deactivates dark mode.
	 *
	 * Side effect: Modifies the DOM.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public deactivate(): void {
		const meta = document.querySelector(META_SELECTOR) as HTMLMetaElement
		const content = 'light dark'

		if (meta) meta.setAttribute('content', content)
		else this.#appendMetaToHead(content)

		this.#logger.debug({ darkMode: false })
	}

	/**
	 * Appends a meta element to the document head.
	 *
	 * Side effect: Modifies the DOM.
	 *
	 * @param  {string} content Value for the element's content attribute.
	 * @return {void}
	 * @since  0.2.3
	 */
	#appendMetaToHead(content: string): void {
		const meta = document.createElement('meta')
		meta.setAttribute('content', content)
		meta.setAttribute('name', 'color-scheme')

		document.head.appendChild(meta)
	}
}
