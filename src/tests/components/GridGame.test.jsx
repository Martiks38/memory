import React from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import GridGame from '../../components/GridGame'
import newGame from '../../utils/generateGame'
import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'
import { total_time } from '../../consts/game'

expect.extend(matchers)

describe('GridGame', () => {
  test('Render content', () => {
    const gridGame = render(<GridGame />)

    const containerGameGrid = gridGame.getByTestId('container-gameGrid')

    expect(containerGameGrid).toBeInTheDocument()
  })

  describe('General', () => {
    let gridGame

    beforeEach(() => {
      gridGame = render(<GridGame />)
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
      cleanup()
    })

    test('When two different cards are turned over, they are turned over again.', async () => {
      const names = newGame.getNameCards()

      for (let i = 0; i < 2; i++) {
        const card = gridGame.getAllByAltText(names[i])
        fireEvent.click(card.at(0))

        await act(() => {
          vi.runAllTimers()
        })
      }

      await waitFor(() => expect(gridGame.container.querySelectorAll('.flip')).toHaveLength(0))
    })
  })

  describe('Time trial game.', () => {
    const trial = true
    let gridGame

    beforeEach(() => {
      gridGame = render(<GridGame trial={trial} />)
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    test('When rendering the page the message "Tiempo restante 05:00" should appear.', () => {
      const message = gridGame.getByText('Tiempo restante 05:00')

      expect(message).toBeInTheDocument()
    })

    test('When pressing two equal cards, the data-flip attribute changes from true to false, they will have the class flip and correct. Having length 2.', () => {
      const cards = gridGame.getAllByAltText('Vestal')

      act(() => {
        cards.forEach((card) => {
          fireEvent.click(card)
        })
      })

      act(() => {
        vi.advanceTimersByTime(600)
      })

      const data_flip_false = gridGame.container.querySelectorAll('[data-flip="false"]')

      expect(data_flip_false).toHaveLength(2)

      const flips = gridGame.container.querySelectorAll('.flip')

      expect(flips).toHaveLength(2)

      const corrects = gridGame.container.querySelectorAll('.correct')

      expect(corrects).toHaveLength(2)
    })

    test(`After ${millisecondsToMinutesSeconds(total_time)[0].slice(
			-1
		)} minutes of starting the game, it ends and the ModalResult must be rendered.`, async () => {
      const cards = gridGame.getAllByTestId('card')

      fireEvent.click(cards.at(0))

      act(() => vi.advanceTimersByTime(total_time))

      await waitFor(() => expect(screen.getByText(/^Volver a jugar$/i)).toBeInTheDocument())
    })

    test('When displaying the result modal the remaining time text is unset and the card array has zero length.', async () => {
      const cards = gridGame.getAllByTestId('card')

      fireEvent.click(cards.at(0))

      act(() => vi.advanceTimersByTime(total_time))

      await waitFor(() => {
        expect(screen.queryByText(/^Tiempo restante/i)).toBeNull()

        expect(screen.queryAllByTestId('card')).toHaveLength(0)
      })
    })

    test('When pressing "Replay", a new arrangement of cards different from the previous one must be generated and these do not have to be turned over.', async () => {
      const oldCards = gridGame.getAllByTestId('card')

      fireEvent.click(oldCards.at(0))

      await act(() => vi.advanceTimersByTime(total_time))

      const try_game = screen.getByText('Volver a jugar')

      fireEvent.click(try_game)

      const newCards = gridGame.getAllByTestId('card')

      expect(newCards).not.toEqual(expect.arrayContaining(oldCards))

      expect(gridGame.container.querySelectorAll('.card')).toHaveLength(newGame.getOrder ** 2)

      expect(gridGame.container.querySelectorAll('.flip')).toHaveLength(0)
    })
  })

  describe('Game without time limit.', () => {
    let gridGame

    beforeEach(() => {
      gridGame = render(<GridGame />)
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    test('When the page is rendered the message "Tiempo restante 05:00" should not appear.', () => {
      const time_remaining = gridGame.queryByText(/^Tiempo restante/i)

      expect(time_remaining).toBeNull()
    })

    test('Flipping all the cards correctly should render the result modal.', async () => {
      const names = newGame.getNameCards()

      for (const name of names) {
        const cards = gridGame.getAllByAltText(name)

        for (const card of cards) {
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
