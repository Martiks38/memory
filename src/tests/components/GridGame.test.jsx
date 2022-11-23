import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import GridGame from '../../components/GridGame'

import newGame from '../../utils/generateGame'
import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'

import { total_time } from '../../consts/game'

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
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('When two different cards are turned over, they are turned over again.', async () => {
      let names = newGame.getNameCards()

      for (let i = 0; i < 2; i++) {
        let card = gridGame.getAllByAltText(names[i])
        fireEvent.click(card.at(0))

        await act(() => {
          jest.runAllTimers()
        })
      }

      await waitFor(() =>
        expect(gridGame.container.querySelectorAll('.flip')).toHaveLength(0)
      )
    })
  })

  describe('Time trial game.', () => {
    let trial = true
    let gridGame

    beforeEach(() => {
      gridGame = render(<GridGame trial={trial} />)
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('When rendering the page the message "Tiempo restante 05:00" should appear.', () => {
      const message = gridGame.getByText('Tiempo restante 05:00')

      expect(message).toBeInTheDocument()
    })

    test('When pressing two equal cards, the data-flip attribute changes from true to false, they will have the class flip and correct. Having length 2.', () => {
      let cards = gridGame.getAllByAltText('Vestal')

      act(() => {
        cards.forEach((card) => {
          fireEvent.click(card)
        })
      })

      act(() => {
        jest.advanceTimersByTime(600)
      })

      let data_flip_false = gridGame.container.querySelectorAll(
        '[data-flip="false"]'
      )

      expect(data_flip_false).toHaveLength(2)

      let flips = gridGame.container.querySelectorAll('.flip')

      expect(flips).toHaveLength(2)

      let corrects = gridGame.container.querySelectorAll('.correct')

      expect(corrects).toHaveLength(2)
    })

    test(`After ${millisecondsToMinutesSeconds(total_time)[0].slice(
      -1
    )} minutes of starting the game, it ends and the ModalResult must be rendered.`, async () => {
      let cards = gridGame.getAllByTestId('card')

      fireEvent.click(cards.at(0))

      act(() => jest.advanceTimersByTime(total_time))

      await waitFor(() =>
        expect(screen.getByText(/^Volver a jugar$/i)).toBeInTheDocument()
      )
    })

    test('When displaying the result modal the remaining time text is unset and the card array has zero length.', async () => {
      let cards = gridGame.getAllByTestId('card')

      fireEvent.click(cards.at(0))

      act(() => jest.advanceTimersByTime(total_time))

      await waitFor(() => {
        expect(screen.queryByText(/^Tiempo restante/i)).toBeNull()

        expect(screen.queryAllByTestId('card')).toHaveLength(0)
      })
    })

    test('When pressing "Replay", a new arrangement of cards different from the previous one must be generated and these do not have to be turned over.', async () => {
      let oldCards = gridGame.getAllByTestId('card')

      fireEvent.click(oldCards.at(0))

      await act(() => jest.advanceTimersByTime(total_time))

      let try_game = screen.getByText('Volver a jugar')

      fireEvent.click(try_game)

      let newCards = gridGame.getAllByTestId('card')

      expect(newCards).not.toEqual(expect.arrayContaining(oldCards))

      expect(gridGame.container.querySelectorAll('.card')).toHaveLength(
        newGame.getOrder ** 2
      )

      expect(gridGame.container.querySelectorAll('.flip')).toHaveLength(0)
    })
  })

  describe('Game without time limit.', () => {
    let gridGame

    beforeEach(() => {
      gridGame = render(<GridGame />)
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('When the page is rendered the message "Tiempo restante 05:00" should not appear.', () => {
      let time_remaining = gridGame.queryByText(/^Tiempo restante/i)

      expect(time_remaining).toBeNull()
    })

    test('Flipping all the cards correctly should render the result modal.', async () => {
      let names = newGame.getNameCards()

      for (let name of names) {
        let cards = gridGame.getAllByAltText(name)

        for (let card of cards) {
          fireEvent.click(card)

          await act(() => {
            jest.runAllTimers()
          })
        }
      }

      await waitFor(() =>
        expect(
          screen.getByText(
            /Una victoria mínima, pero victoria al fin y al cabo./i
          )
        ).toBeInTheDocument()
      )
    })
  })
})
