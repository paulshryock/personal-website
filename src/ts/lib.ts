interface UserPreference {
	query: string
	callback: (...args: any[]) => void
}

interface UserPreferences {
	[key: string]: UserPreference
}

export const userPreferences: UserPreferences = {
	darkMode: {
		query: '(prefers-color-scheme: dark)',
		callback: setDarkMode,
	},
}

/**
 * Adds media query change event listeners for each preference.
 *
 * @since 0.1.0
 */
export function listenForPreferenceChanges(preferences: UserPreferences): void {
	for (const value of Object.values(preferences)) {
		const { query, callback } = value
		window.matchMedia(query).addEventListener('change', (event) => {
			callback(event.matches)
		})
	}
}

/**
 * Determines if a media query matches.
 *
 * @since  0.1.0
 */
export function mediaQueryMatches(query: string): boolean {
	return (window.matchMedia && window.matchMedia(query)?.matches) === true
}

/**
 * Sets dark mode preference.
 *
 * Updates <meta name='color-scheme' /> in the DOM.
 *
 * @since 0.1.0
 */
export function setDarkMode(dark: boolean): void {
	const fallback = document.createElement('meta')
	fallback.name = 'color-scheme'
	const existingMeta: HTMLMetaElement | null = document.querySelector(
		'[name="color-scheme"]',
	)
	const meta = existingMeta ?? fallback

	// Set dark mode.
	const value = dark ? 'dark light' : 'light dark'
	meta.setAttribute('content', value)
	console.debug(`user prefers ${value.split(' ')[0]} mode`, true)

	// Maybe add meta element to DOM.
	if (existingMeta === null) {
		document.head.appendChild(meta)
	}
}
