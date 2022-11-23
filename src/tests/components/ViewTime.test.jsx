import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'

import ViewTime from '../../components/ViewTime'
import { total_time } from '../../consts/game'

describe('ViewTime', () => {
  let onFinish = jest.fn()
  let status = 'playing'

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
    onFinish.mockReset()
  })

  test('As long as the initTime is zero (the game did not start) the remaining time must be 05:00.', () => {
    let initTime = 0

    render(<ViewTime initTime={initTime} status={status} onFinish={onFinish} />)

    jest.advanceTimersByTime(1000)

    const message = screen.getByText(/05:00$/)

    expect(message.textContent).toBe('Tiempo restante 05:00')
  })

  test('After one second, the remaining time should be 04:59.', async () => {
    let initTime = 100000

    render(<ViewTime initTime={initTime} status={status} onFinish={onFinish} />)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    const message = await screen.findByText(/04:59$/)

    expect(message.textContent).toBe('Tiempo restante 04:59')
  })

  test('At the end of the time, it calls once the function that modifies the state of the game.', () => {
    let initTime = 100000

    render(<ViewTime initTime={initTime} status={status} onFinish={onFinish} />)

    act(() => {
      jest.advanceTimersByTime(total_time)
    })

    expect(onFinish).toHaveBeenCalledTimes(1)
  })
})
