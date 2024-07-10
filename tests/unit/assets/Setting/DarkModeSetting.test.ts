/** @jest-environment jsdom */

import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { cleanupMedia, matchMedia, setMedia } from 'mock-match-media'
import { DarkModeSetting } from '../../../../src/assets/ts/Setting/DarkModeSetting.ts'

beforeEach(() => {
	window.matchMedia = matchMedia
})
afterEach(() => cleanupMedia())

describe('DarkModeSetting', () => {
	describe.each([
		['initially has no preferred color scheme', ''],
		[
			'color scheme initially prefers light',
			'<meta content="light dark" name="color-scheme">',
		],
		[
			'color scheme initially prefers dark',
			'<meta content="dark light" name="color-scheme">',
		],
	])('when the document %s', (_: string, markup: string) => {
		beforeEach(() => {
			document.head.innerHTML = markup
		})

		describe.each([
			['light', 'dark'],
			['dark', 'light'],
		])('when the user prefers %s mode', (initial, next) => {
			beforeEach(() => setMedia({ 'prefers-color-scheme': initial }))

			describe('when the user preference is followed', () => {
				beforeEach(() => new DarkModeSetting().followUserPreference())

				it(`should set the document's preferred color scheme to ${initial}`, () =>
					expect(
						document
							.querySelector('[name="color-scheme"]')
							?.getAttribute('content')
							?.split(' ')[0],
					).toBe(initial))

				describe(`when the user changes their preference to ${next} mode`, () => {
					beforeEach(() => setMedia({ 'prefers-color-scheme': next }))

					it(`should set the document's preferred color scheme to ${next}`, () =>
						expect(
							document
								.querySelector('[name="color-scheme"]')
								?.getAttribute('content')
								?.split(' ')[0],
						).toBe(next))
				})
			})
		})
	})
})
