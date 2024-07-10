import { Setting } from './Setting.ts'

/**
 * Dark mode is a user interface display setting which prioritizes light text
 * on dark backgrounds.
 *
 * @sealed
 * @since 0.2.3
 * @todo  Nest name and value inside query
 * @todo  Add name "darkMode"
 * @todo  Add isActive property, set in constructor, activate, deactivate
 */
export class DarkModeSetting extends Setting {
	/**
	 * Media query for this setting.
	 *
	 * @type  {string}
	 * @since unreleased
	 */
	public readonly mediaQuery: string = '(prefers-color-scheme: dark)'

	/**
	 * 'color-scheme' meta element query.
	 *
	 * @type  {string}
	 * @since unreleased
	 */
	readonly #query: string = '[name="color-scheme"]'

	/**
	 * Activates dark mode.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public activate(): void {
		this.#preferColorSchemes('dark light')
	}

	/**
	 * Deactivates dark mode.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public deactivate(): void {
		this.#preferColorSchemes('light dark')
	}

	/**
	 * Sets the document's preferred color schemes in order.
	 *
	 * @param  {string} schemes Space-separated schemes in order of preference.
	 * @return {void}
	 *
	 * @since unreleased
	 */
	#preferColorSchemes(schemes: string): void {
		if (!this.#getMeta()) this.#addMeta()

		this.#getMeta()?.setAttribute('content', schemes)
	}

	/**
	 * Gets the document's 'color-scheme' meta element, if there is one.
	 *
	 * @return {HTMLMetaElement | null} Meta element or null.
	 * @since  unreleased
	 */
	#getMeta(): HTMLMetaElement | null {
		return document.querySelector(this.#query)
	}

	/**
	 * Adds a 'color-scheme' meta element to the document head.
	 *
	 * @return {void}
	 * @since  unreleased
	 */
	#addMeta(): void {
		const meta = document.createElement('meta')
		meta.setAttribute('name', 'color-scheme')

		document.head.appendChild(meta)
	}
}
