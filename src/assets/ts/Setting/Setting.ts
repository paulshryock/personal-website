/**
 * A setting is the context for a number of options. A number of settings
 * combine to make up a configuration.
 *
 * @since 0.2.3
 */
export abstract class Setting {
	/**
	 * Media query for this setting.
	 *
	 * @type  {string}
	 * @since unreleased
	 */
	public abstract readonly mediaQuery: string

	/**
	 * Updates the setting based on user preference. Listens for user preference
	 * changes and activates or deactivates.
	 *
	 * @since 0.2.3
	 */
	public followUserPreference(): void {
		this.#setFromUserPreference()
		this.#listenForUserPreferenceChange()
	}

	/**
	 * Activates the setting.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public abstract activate(): void

	/**
	 * Deactivates the setting.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public abstract deactivate(): void

	/**
	 * Updates the setting based on user preference.
	 *
	 * Side effect: Modifies the DOM.
	 *
	 * @return {void}
	 * @since  0.2.3
	 * @since  unreleased -- Changed visibility to private.
	 */
	#setFromUserPreference(): void {
		if (this.#isUserPreferred()) this.activate()
		else this.deactivate()
	}

	/**
	 * Checks if the setting is preferred by the user.
	 *
	 * @return {boolean} Whether or not the setting is preferred by the user.
	 * @since  0.2.3
	 * @since  unreleased -- Changed visibility to private.
	 */
	#isUserPreferred(): boolean {
		return window.matchMedia(this.mediaQuery).matches
	}

	/**
	 * Listens for user preference changes and activates or deactivates.
	 *
	 * Side effect: Adds an event listener to window.matchMedia.
	 *
	 * @return {void}
	 * @since  0.2.3
	 * @since  unreleased -- Changed visibility to private.
	 */
	#listenForUserPreferenceChange(): void {
		window.matchMedia(this.mediaQuery).addEventListener('change', () => {
			this.#setFromUserPreference()
		})
	}
}
