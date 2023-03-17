import React from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import Game from '@/pages/Game'
import { totalTime } from '@/consts/game'

expect.extend(matchers)

describe('Game', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	describe('Game without time limit.', () => {
		let game

		beforeEach(() => {
			game = render(<Game />)
		})

		afterEach(() => {
			cleanup()
		})

		test('The background image must have the value "style._values.filter = undefined" throughout the game.', () => {
			const cards = game.getAllByTestId('card')

			fireEvent.click(cards.at(1).firstElementChild)

			act(() => vi.advanceTimersByTime(30000))

			const backgroundImg = game.container.querySelector('#bgImageGame')

			expect(backgroundImg.style._values.filter).toBeUndefined()
		})
	})

	describe('Time trial game.', () => {
		let game

		beforeEach(() => {
			game = render(<Game timeTrial={true} />)
		})

		afterEach(() => {
			cleanup()
		})

		test('After 30 seconds the background image should have the style "grayscale(0.1)".', () => {
			const cards = game.getAllByTestId('card')

			fireEvent.click(cards.at(1).firstElementChild)

			act(() => vi.advanceTimersByTime(30000))

			const backgroundImg = game.container.querySelector('#bgImageGame')

			expect(backgroundImg).toHaveStyle({ filter: 'grayscale(0.1)' })
		})

		test('After 5 minutes the background image should have the style "grayscale(1)".', async () => {
			const cards = game.getAllByTestId('card')

			fireEvent.click(cards.at(1).firstElementChild)

			await act(() => vi.advanceTimersByTime(totalTime))

			const backgroundImg = game.container.querySelector('#bgImageGame')

			expect(backgroundImg).toHaveStyle({ filter: 'grayscale(1)' })
		})
	})
})
