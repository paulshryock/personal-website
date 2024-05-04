/**
 * A setting is the context for a number of options. A number of settings
 * combine to make up a configuration.
 *
 * @since 0.2.3
 */
export abstract class Setting {
	/**
	 * Name of setting.
	 *
	 * @type  {string}
	 * @since 0.2.3
	 */
	public abstract readonly name: string

	/**
	 * Value of setting.
	 *
	 * @type  {string}
	 * @since 0.2.3
	 */
	public abstract readonly value: string

	/**
	 * Gets a CSS media query to target the setting.
	 *
	 * @type  {string}
	 * @since 0.2.3
	 */
	public getQuery(): string {
		return `(${this.name}: ${this.value})`
	}

	/**
	 * Checks if the setting is preferred by the user.
	 *
	 * @return {boolean} Whether or not the setting is preferred by the user.
	 * @since  0.2.3
	 */
	public isUserPreferred(): boolean {
		return (
			(window.matchMedia && window.matchMedia(this.getQuery())?.matches) ===
			true
		)
	}

	/**
	 * Updates the setting based on user preference. Listens for user preference
	 * changes and activates or deactivates.
	 *
	 * Side effect: Modifies the DOM.
	 *
	 * @since 0.2.3
	 */
	public followUserPreference(): void {
		this.setFromUserPreference()
		this.listenForUserPreferenceChange()
	}

	/**
	 * Updates the setting based on user preference.
	 *
	 * Side effect: Modifies the DOM.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public setFromUserPreference(): void {
		if (this.isUserPreferred()) {
			if (!this.isActive()) this.activate()
		} else if (this.isActive()) this.deactivate()
	}

	/**
	 * Listens for user preference changes and activates or deactivates.
	 *
	 * Side effect: Adds an event listener to window.matchMedia.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	public listenForUserPreferenceChange(): void {
		window
			.matchMedia(this.getQuery())
			.addEventListener('change', () => this.setFromUserPreference())
	}

	/**
	 * Checks if the setting is currently active.
	 *
	 * @return {boolean} Whether or not the setting is currently active.
	 * @since  0.2.3
	 */
	abstract isActive(): boolean

	/**
	 * Activates the setting.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	abstract activate(): void

	/**
	 * Deactivates the setting.
	 *
	 * @return {void}
	 * @since  0.2.3
	 */
	abstract deactivate(): void
}
