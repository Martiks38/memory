import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'

import Card from '../../components/Card'

describe('Card', () => {
  let src = '/vestal.webp'
  let setState

  let card

  beforeEach(() => {
    setState = jest.fn()
    card = render(<Card src={src} onFlip={setState} />)
  })

  afterEach(() => {
    setState.mockReset()
  })

  test('The function must be executed once when the card is clicked.', () => {
    fireEvent.click(card.getByTestId('card'))

    expect(setState).toHaveBeenCalledTimes(1)
  })

  test('Clicking the card adds the flip class.', () => {
    let container_card = card.getByTestId('card')

    fireEvent.click(container_card)

    let listClasses = Array.from(container_card.classList)

    expect(listClasses).toEqual(expect.arrayContaining(['flip']))
  })

  test('By clicking the card twice, the card adds the flip class and then it is removed and the function is executed twice.', () => {
    let container_card = card.getByTestId('card')
    let listClasses

    fireEvent.click(container_card)
    fireEvent.click(container_card)

    listClasses = Array.from(container_card.classList)

    expect(listClasses).toEqual(expect.not.arrayContaining(['flip']))

    expect(setState).toHaveBeenCalledTimes(2)
  })
})
