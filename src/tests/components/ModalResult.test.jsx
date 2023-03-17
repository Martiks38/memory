import React from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import ModalResult from '@/components/ModalResult'
import millisecondsToMinutesSeconds from '@/utils/millisecondsToMinutesSeconds'

expect.extend(matchers)

describe('ModalResult', () => {
	let tryGame

	const dataGame = {
		flips: 36,
		time: 60 * 1000 // one minute
	}

	beforeEach(() => {
		tryGame = vi.fn()
	})

	afterEach(() => {
		tryGame.mockReset()
	})

	describe('Button test', () => {
		let modalResult

		beforeEach(() => {
			modalResult = render(<ModalResult dataGame={dataGame} tryGame={tryGame} status="victory" />)
		})

		afterEach(() => {
			cleanup()
		})

		test('When pressing "Inicio", the pathname must be "/".', () => {
			const btnHome = modalResult.getByText('Inicio')

			fireEvent.click(btnHome)

			expect(location.pathname).toBe('/')
		})

		test('Pressing "Volver a jugar" should be called once.', () => {
			const tryGameBtn = modalResult.getByText('Volver a jugar')

			fireEvent.click(tryGameBtn)

			expect(tryGame).toHaveBeenCalledTimes(1)
		})
	})

	describe('Victory', () => {
		let modalResult

		beforeEach(() => {
			modalResult = render(<ModalResult dataGame={dataGame} tryGame={tryGame} status="victory" />)
		})

		afterEach(() => {
			cleanup()
		})

		test('The title should be: "Una victoria mínima, pero victoria al fin y al cabo."', () => {
			const title = modalResult.getByText('Una victoria mínima, pero victoria al fin y al cabo.')

			expect(title).toBeInTheDocument()
		})

		test(`It should display: "<minutes>:<seconds>". For dataGame.time = ${dataGame.time}.`, () => {
			const [minutes, seconds] = millisecondsToMinutesSeconds(dataGame.time)

			const time = modalResult.getByText(`${minutes}:${seconds}`)

			expect(time).toBeInTheDocument()
		})

		test(`It should show "Cartas volteadas: ${dataGame.flips}".`, () => {
			const flip_cards = modalResult.getByText(`${dataGame.flips}`)

			expect(flip_cards).toBeInTheDocument()
		})
	})

	describe('Defeat', () => {
		let modalResult

		beforeEach(() => {
			modalResult = render(<ModalResult dataGame={dataGame} tryGame={tryGame} status="defeat" />)
		})

		test('The title should be: "Oídos que resuenan, visión borrosa... el fin está cerca."', () => {
			const title = modalResult.getByText(
				'Oídos que resuenan, visión borrosa... el fin está cerca.'
			)

			expect(title).toBeInTheDocument()
		})

		test('At the end of the time it should show: "05:00".', () => {
			const time = modalResult.getByText('05:00')

			expect(time).toBeInTheDocument()
		})

		test(`It should show "Cartas volteadas: ${dataGame.flips}".`, () => {
			const flip_cards = modalResult.getByText(`${dataGame.flips}`)

			expect(flip_cards).toBeInTheDocument()
		})
	})
})
