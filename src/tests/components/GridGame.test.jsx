import React from 'react'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import GridGame from '@/components/GridGame'
import newGame from '@/utils/generateGame'
import millisecondsToMinutesSeconds from '@/utils/millisecondsToMinutesSeconds'
import { totalTime } from '@/consts/game'

expect.extend(matchers)
describe('GridGame', () => {
	beforeAll(() => vi.useFakeTimers())

	afterAll(() => vi.useRealTimers())

	describe('General', () => {
		beforeEach(() => {
			vi.clearAllTimers()
			vi.setSystemTime(0)
		})

		afterEach(() => cleanup())

		test('Render content', () => {
			const gridGame = render(<GridGame />)

			const containerGameGrid = gridGame.getByTestId('container-gameGrid')

			expect(containerGameGrid).toBeInTheDocument()
		})

		test('When two different cards are turned over, they are turned over again.', () => {
			const gridGame = render(<GridGame />)

			const names = newGame.getNameCards()

			for (let i = 0; i < 2; i++) {
				const card = gridGame.getAllByAltText(names[i])
				act(() => {
					fireEvent.click(card.at(0))
				})
			}
			act(() => vi.runAllTimers())

			expect(gridGame.container.querySelectorAll('.flip')).toHaveLength(0)
		})
	})

	describe('Time trial game.', () => {
		beforeEach(() => {
			vi.clearAllTimers()
			vi.setSystemTime(0)
		})

		afterEach(() => cleanup())

		test('When rendering the page the message "Tiempo restante 05:00" should appear.', () => {
			const message = render(<GridGame timeTrial={true} />).getByText('Tiempo restante 05:00')

			expect(message).toBeInTheDocument()
		})

		test('When pressing two equal cards, the data-flip attribute changes from true to false, they will have the class flip and correct. Having length 2.', () => {
			const { container, getAllByAltText } = render(<GridGame timeTrial={true} />)
			let cards = getAllByAltText('Vestal')

			cards.forEach((card) => {
				act(() => fireEvent.click(card))
			})

			act(() => vi.advanceTimersByTime(600))

			let dataFlipFalse = container.querySelectorAll('[data-flip="false"]')

			expect(dataFlipFalse).toHaveLength(2)

			let flips = container.querySelectorAll('.flip')

			expect(flips).toHaveLength(2)

			let corrects = container.querySelectorAll('.correct')

			expect(corrects).toHaveLength(2)
		})

		test(`After ${millisecondsToMinutesSeconds(totalTime)[0].slice(
			-1
		)} minutes of starting the game, it ends and the ModalResult must be rendered.`, async () => {
			const { getAllByTestId } = render(<GridGame timeTrial={true} />)
			let cards = getAllByTestId('card')

			act(() => {
				fireEvent.click(cards[0])
				vi.advanceTimersByTime(totalTime)
			})

			setTimeout(async () => expect(await screen.findByText('Volver a jugar')).toBeDefined(), 0)
		})

		test('When displaying the result modal the remaining time text is unset and the card array has zero length.', async () => {
			const { getAllByAltText } = render(<GridGame timeTrial={true} />)
			const cards = getAllByAltText('Vestal')

			act(() => {
				fireEvent.click(cards[0])
			})

			act(() => vi.advanceTimersByTime(totalTime))

			setTimeout(() => {
				expect(screen.getByText(/^Tiempo restante/i)).not.toBeInTheDocument()
			}, 0)
		})

		test('When pressing "Replay", a new arrangement of cards different from the previous one must be generated and these do not have to be turned over.', async () => {
			const { getAllByTestId } = render(<GridGame timeTrial={true} />)

			let oldCards = getAllByTestId('card')

			act(() => fireEvent.click(oldCards[0]))

			act(() => vi.advanceTimersByTime(totalTime))

			setTimeout(() => {
				let btnTryGame = screen.getByText('Volver a jugar')
				act(() => fireEvent.click(btnTryGame.closest('button')))

				expect(screen.getAllByTestId('card')).not.toEqual(oldCards)
			}, 0)
		})
	})

	describe('Game without time limit.', () => {
		beforeEach(() => {
			vi.clearAllTimers()
			vi.setSystemTime(0)
		})

		afterEach(() => cleanup())

		test('When the page is rendered the message "Tiempo restante 05:00" should not appear.', () => {
			const gridGame = render(<GridGame />)
			const timeRemaining = gridGame.queryByText(/^Tiempo restante/i)

			expect(timeRemaining).toBeNull()
		})

		test('Flipping all the cards correctly should render the result modal.', async () => {
			const gridGame = render(<GridGame />)
			let names = newGame.getNameCards()

			for (let name of names) {
				let cards = gridGame.getAllByAltText(name)

				for (let card of cards) {
					fireEvent.click(card)

					await act(() => {
						vi.runAllTimers()
					})
				}
			}

			await waitFor(() =>
				expect(
					screen.getByText(/Una victoria mínima, pero victoria al fin y al cabo./i)
				).toBeInTheDocument()
			)
		})
	})
})
