import {
	listenForPreferenceChanges,
	userPreferences,
	mediaQueryMatches,
} from './lib.js'

const { BUILD_ENV, BUILD_VERSION } = process.env
console.debug(BUILD_ENV === 'production' ? { BUILD_VERSION } : process.env)

// Get initial user preferences.
for (const preference of Object.values(userPreferences)) {
	const { query, callback } = preference
	callback(mediaQueryMatches(query))
}

// Listen for changes to user preferences.
listenForPreferenceChanges(userPreferences)
