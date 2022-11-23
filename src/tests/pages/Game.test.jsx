import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent, render, screen } from '@testing-library/react'

import Game from '../../pages/Game'

import { total_time } from '../../consts/game'

describe('Game', () => {
  let game

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Game without time limit.', () => {
    beforeEach(() => {
      game = render(<Game />)
    })

    test('The background image must have the value "style._values.filter = undefined" throughout the game.', () => {
      let cards = game.getAllByTestId('card')

      fireEvent.click(cards.at(1).firstElementChild)

      act(() => jest.advanceTimersByTime(30000))

      let background_img = game.container.querySelector('#bgImageGame')

      expect(background_img.style._values.filter).toBeUndefined()
    })
  })

  describe('Time trial game.', () => {
    beforeEach(() => {
      let trial = true

      game = render(<Game trial={trial} />)
    })

    test('After 30 seconds the background image should have the style "grayscale(0.1)".', () => {
      let cards = game.getAllByTestId('card')

      fireEvent.click(cards.at(1).firstElementChild)

      act(() => jest.advanceTimersByTime(30000))

      let background_img = game.container.querySelector('#bgImageGame')

      expect(background_img).toHaveStyle({ filter: 'grayscale(0.1)' })
    })

    test('After 5 minutes the background image should have the style "grayscale(1)".', async () => {
      let cards = game.getAllByTestId('card')

      fireEvent.click(cards.at(1).firstElementChild)

      await act(() => jest.advanceTimersByTime(total_time))

      let background_img = game.container.querySelector('#bgImageGame')

      expect(background_img).toHaveStyle({ filter: 'grayscale(1)' })
    })

    test('When you press replay the background image should have the style "grayscale(0)".', async () => {
      let cards = game.getAllByTestId('card')

      fireEvent.click(cards.at(1).firstElementChild)

      await act(() => jest.advanceTimersByTime(total_time))

      let try_game = screen.getByText(/Volver a jugar/)

      fireEvent.click(try_game)

      let background_img = game.container.querySelector('#bgImageGame')

      expect(background_img).toHaveStyle({ filter: 'grayscale(0)' })
    })
  })
})
