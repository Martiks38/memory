import React from 'react'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import Home from '@/pages/Home'

expect.extend(matchers)

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		}))
	})
})

describe('Home', () => {
	let home

	beforeEach(() => {
		home = render(<Home />)
	})

	test('Render content', () => {
		const button = home.getByText(/^Jugar$/)

		expect(button).toBeInTheDocument()
	})

	test('There should be two buttons with the word "Jugar".', () => {
		const buttons = home.getAllByText(/^Jugar/)

		expect(buttons).toHaveLength(2)
	})

	test('Pressing Jugar should go to the "/game" path.', () => {
		const button = home.getByRole('link', { name: 'Jugar' })

		fireEvent.click(button)

		expect(location.pathname).toBe('/game')
	})

	test('Pressing Play Time Trial should go to the path "/game/time_trial".', () => {
		const button = home.getByRole('link', { name: 'Jugar contrarreloj' })

		fireEvent.click(button)

		expect(location.pathname).toBe('/game/time_trial')
	})
})
