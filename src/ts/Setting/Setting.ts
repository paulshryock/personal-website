/**
 * A setting is the context for a number of options. A number of settings
 * combine to make up a configuration.
 *
 * @since unreleased
 */
export abstract class Setting {
	/**
	 * Name of setting.
	 *
	 * @type  {string}
	 * @since unreleased
	 */
	public abstract readonly name: string

	/**
	 * Value of setting.
	 *
	 * @type  {string}
	 * @since unreleased
	 */
	public abstract readonly value: string

	/**
	 * Gets a CSS media query to target the setting.
	 *
	 * @type  {string}
	 * @since unreleased
	 */
	public getQuery(): string {
		return `(${this.name}: ${this.value})`
	}

	/**
	 * Checks if the setting is preferred by the user.
	 *
	 * @return {boolean} Whether or not the setting is preferred by the user.
	 * @since  unreleased
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
	 * @since unreleased
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
	 * @since  unreleased
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
	 * @since  unreleased
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
	 * @since  unreleased
	 */
	abstract isActive(): boolean

	/**
	 * Activates the setting.
	 *
	 * @return {void}
	 * @since  unreleased
	 */
	abstract activate(): void

	/**
	 * Deactivates the setting.
	 *
	 * @return {void}
	 * @since  unreleased
	 */
	abstract deactivate(): void
}
