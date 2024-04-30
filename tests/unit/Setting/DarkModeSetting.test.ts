/** @jest-environment jsdom */

import {
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
	jest,
} from '@jest/globals'
import { cleanupMedia, matchMedia, setMedia } from 'mock-match-media'
import { DarkModeSetting } from '../../../src/ts/Setting/DarkModeSetting.js'

beforeAll(() => {
	window.matchMedia = matchMedia
})

beforeEach(() => {
	document.head.innerHTML = ''
	console.debug = jest.fn()
})

afterEach(() => cleanupMedia())

let darkModeSetting: DarkModeSetting

describe('DarkModeSetting', () => {
	beforeEach(() => {
		darkModeSetting = new DarkModeSetting()
		darkModeSetting.followUserPreference()
	})

	describe('when dark mode is not preferred by the user', () => {
		beforeEach(() => setMedia({ 'prefers-color-scheme': 'light' }))

		it('should find that dark mode is not preferred by the user', () =>
			expect(darkModeSetting.isUserPreferred()).toBe(false))

		it('should find that dark mode is not active', () =>
			expect(darkModeSetting.isActive()).toBe(false))

		describe('when dark mode becomes preferred by the user', () => {
			beforeEach(() => setMedia({ 'prefers-color-scheme': 'dark' }))

			it('should find that dark mode is preferred by the user', () =>
				expect(darkModeSetting.isUserPreferred()).toBe(true))

			it('should find that dark mode is active', () =>
				expect(darkModeSetting.isActive()).toBe(true))

			it('should log a debug message that dark mode is active', () =>
				expect(console.debug).toHaveBeenCalledWith({ darkMode: true }))
		})
	})

	describe('when dark mode is preferred by the user', () => {
		beforeEach(() => setMedia({ 'prefers-color-scheme': 'dark' }))

		it('should find that dark mode is preferred by the user', () =>
			expect(darkModeSetting.isUserPreferred()).toBe(true))

		it('should find that dark mode is active', () =>
			expect(darkModeSetting.isActive()).toBe(true))

		describe('when dark mode becomes not preferred by the user', () => {
			beforeEach(() => setMedia({ 'prefers-color-scheme': 'light' }))

			it('should find that dark mode is not preferred by the user', () =>
				expect(darkModeSetting.isUserPreferred()).toBe(false))

			it('should find that dark mode is not active', () =>
				expect(darkModeSetting.isActive()).toBe(false))

			it('should log a debug message that dark mode is not active', () =>
				expect(console.debug).toHaveBeenCalledWith({ darkMode: false }))
		})
	})
})
