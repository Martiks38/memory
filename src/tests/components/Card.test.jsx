import React from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import Card from '@/components/Card'

expect.extend(matchers)

describe('Card', () => {
	const src = '/vestal.webp'
	let setState
	let card

	beforeEach(() => {
		setState = vi.fn()
		card = render(<Card src={src} onFlip={setState} />)
	})

	afterEach(() => {
		setState.mockReset()
		cleanup()
	})

	test('The function must be executed once when the card is clicked.', () => {
		const containerCard = card.getByTestId('card')

		fireEvent.click(containerCard)

		expect(setState).toHaveBeenCalledTimes(1)
	})

	test('Clicking the card adds the flip class.', () => {
		const containerCard = card.getByTestId('card')

		fireEvent.click(containerCard)

		const listClasses = Array.from(containerCard.classList)

		expect(listClasses).toEqual(expect.arrayContaining(['flip']))
	})

	test('By clicking the card twice, the card adds the flip class and then it is removed and the function is executed twice.', () => {
		const containerCard = card.getByTestId('card')
		let listClasses

		fireEvent.click(containerCard)
		fireEvent.click(containerCard)

		listClasses = Array.from(containerCard.classList)

		expect(listClasses).toEqual(expect.not.arrayContaining(['flip']))

		expect(setState).toHaveBeenCalledTimes(2)
	})
})
