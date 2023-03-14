import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'
import Card from '../../components/Card'

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
    const container_card = card.getByTestId('card')

    fireEvent.click(container_card)

    expect(setState).toHaveBeenCalledTimes(1)
  })

  test('Clicking the card adds the flip class.', () => {
    const container_card = card.getByTestId('card')

    fireEvent.click(container_card)

    const listClasses = Array.from(container_card.classList)

    expect(listClasses).toEqual(expect.arrayContaining(['flip']))
  })

  test('By clicking the card twice, the card adds the flip class and then it is removed and the function is executed twice.', () => {
    const container_card = card.getByTestId('card')
    let listClasses

    fireEvent.click(container_card)
    fireEvent.click(container_card)

    listClasses = Array.from(container_card.classList)

    expect(listClasses).toEqual(expect.not.arrayContaining(['flip']))

    expect(setState).toHaveBeenCalledTimes(2)
  })
})
