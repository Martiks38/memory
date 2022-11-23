import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import ModalResult from '../../components/ModalResult'
import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'

describe('ModalResult', () => {
  let try_game
  let modal_result
  let dataGame = {
    flips: 36,
    time: 60 * 1000, // one minute
  }
  let status

  beforeEach(() => {
    try_game = jest.fn()
  })

  afterEach(() => {
    try_game.mockReset()
  })

  describe('Button test', () => {
    beforeEach(() => {
      status = 'victory'

      modal_result = render(
        <ModalResult dataGame={dataGame} tryGame={try_game} status={status} />
      )
    })

    test('When pressing "Inicio", the pathname must be "/".', () => {
      const btnHome = modal_result.getByText('Inicio')

      fireEvent.click(btnHome)

      expect(location.pathname).toBe('/')
    })

    test('Pressing "Volver a jugar" should be called once.', () => {
      const tryGameBtn = modal_result.getByText('Volver a jugar')

      fireEvent.click(tryGameBtn)

      expect(try_game).toHaveBeenCalledTimes(1)
    })
  })

  describe('Victory', () => {
    beforeEach(() => {
      status = 'victory'

      modal_result = render(
        <ModalResult dataGame={dataGame} tryGame={try_game} status={status} />
      )
    })

    test('The title should be: "Una victoria mínima, pero victoria al fin y al cabo."', () => {
      const title = modal_result.getByText(
        'Una victoria mínima, pero victoria al fin y al cabo.'
      )

      expect(title).toBeInTheDocument()
    })

    test(`It should display: "<minutes>:<seconds>". For dataGame.time = ${dataGame.time}.`, () => {
      const [minutes, seconds] = millisecondsToMinutesSeconds(dataGame.time)

      const time = modal_result.getByText(`${minutes}:${seconds}`)

      expect(time).toBeInTheDocument()
    })

    test(`It should show "Cartas volteadas: ${dataGame.flips}".`, () => {
      const flip_cards = modal_result.getByText(`${dataGame.flips}`)

      expect(flip_cards).toBeInTheDocument()
    })
  })

  describe('Defeat', () => {
    beforeEach(() => {
      status = 'defeat'

      modal_result = render(
        <ModalResult dataGame={dataGame} tryGame={try_game} status={status} />
      )
    })

    test('The title should be: "Oídos que resuenan, visión borrosa... el fin está cerca."', () => {
      const title = modal_result.getByText(
        'Oídos que resuenan, visión borrosa... el fin está cerca.'
      )

      expect(title).toBeInTheDocument()
    })

    test('At the end of the time it should show: "05:00".', () => {
      const time = modal_result.getByText('05:00')

      expect(time).toBeInTheDocument()
    })

    test(`It should show "Cartas volteadas: ${dataGame.flips}".`, () => {
      const flip_cards = modal_result.getByText(`${dataGame.flips}`)

      expect(flip_cards).toBeInTheDocument()
    })
  })
})
