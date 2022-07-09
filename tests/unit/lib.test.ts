/**
 * @jest-environment jsdom
 */

import {
	listenForPreferenceChanges,
	mediaQueryMatches,
	setDarkMode,
} from '../../src/ts/lib.js'
import { cleanupMedia, matchMedia, setMedia } from 'mock-match-media'
import '@testing-library/jest-dom'

beforeAll(() => {
	console.debug = jest.fn()
	window.matchMedia = matchMedia
})

afterEach(() => {
	cleanupMedia()
})

describe('listenForPreferenceChanges', () => {
	test('fires a callback when a media query matches', () => {
		const preferences = {
			somePreference: {
				query: '(some-media-query: some-value)',
				callback: jest.fn(),
			},
			anotherPreference: {
				query: '(another-media-query: another-value)',
				callback: jest.fn(),
			},
		}
		// Listen for preference changes.
		listenForPreferenceChanges(preferences)

		// Mock media.
		setMedia({ 'some-media-query': 'some-value' })
		setMedia({ 'another-media-query': 'another-value' })

		// Callback was called.
		expect(preferences.somePreference.callback).toHaveBeenCalled()
		expect(preferences.anotherPreference.callback).toHaveBeenCalled()
	})
})

describe('mediaQueryMatches', () => {
	test.each([
		['prefers-color-scheme', 'light', '(prefers-color-scheme: dark)', false],
		['prefers-color-scheme', 'dark', '(prefers-color-scheme: dark)', true],
		['prefers-color-scheme', 'light', '(prefers-color-scheme: light)', true],
		['prefers-color-scheme', 'dark', '(prefers-color-scheme: light)', false],
	])(
		'when %s is %s, %s matches: %s',
		(key: string, value: string, query: string, matches: boolean) => {
			// Mock media.
			setMedia({ [key]: value })

			// Media query matches.
			expect(mediaQueryMatches(query)).toBe(matches)
		},
	)
})

describe('setDarkMode', () => {
	test.each([
		[false, 'light', 'light dark'],
		[false, 'dark', 'light dark'],
		[false, 'light dark', 'light dark'],
		[false, 'dark light', 'light dark'],
		[true, 'light', 'dark light'],
		[true, 'dark', 'dark light'],
		[true, 'light dark', 'dark light'],
		[true, 'dark light', 'dark light'],
	])(
		'Passing "%s" sets dark mode preference from "%s" to "%s".',
		(dark: boolean, oldValue: string, expected: string) => {
			// Mock meta element.
			const meta = document.createElement('meta')
			meta.setAttribute('name', 'color-scheme')
			meta.setAttribute('content', oldValue)
			document.head.appendChild(meta)

			// Set dark mode.
			setDarkMode(dark)

			// Preference is logged.
			expect(console.debug).toHaveBeenCalledWith(
				`user prefers ${expected.split(' ')[0]} mode`,
				true,
			)

			// Meta value is updated.
			const actual = document.querySelector('[name="color-scheme"]')
			expect(actual).toHaveAttribute('content', expected)
		},
	)
})
