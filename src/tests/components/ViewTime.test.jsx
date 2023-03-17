import React from 'react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import matchers from '@testing-library/jest-dom/matchers'
import ViewTime from '@/components/ViewTime'
import { totalTime } from '@/consts/game'

expect.extend(matchers)

describe('ViewTime', () => {
	const onFinish = vi.fn()
	const status = 'playing'

	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
		onFinish.mockReset()
	})

	test('As long as the initTime is zero (the game did not start) the remaining time must be 05:00.', () => {
		const initTime = 0

		render(<ViewTime initTime={initTime} status={status} onFinish={onFinish} />)

		vi.advanceTimersByTime(1000)

		const message = screen.getByText(/05:00$/)

		expect(message.textContent).toBe('Tiempo restante 05:00')
	})

	test('After one second, the remaining time should be 04:59.', async () => {
		const initTime = 100000

		render(<ViewTime initTime={initTime} status={status} onFinish={onFinish} />)

		act(() => {
			vi.advanceTimersByTime(1000)
		})

		const message = await screen.findByText(/04:59$/)

		expect(message.textContent).toBe('Tiempo restante 04:59')
	})

	test('At the end of the time, it calls once the function that modifies the state of the game.', () => {
		const initTime = 100000

		render(<ViewTime initTime={initTime} status={status} onFinish={onFinish} />)

		act(() => {
			vi.advanceTimersByTime(totalTime)
		})

		expect(onFinish).toHaveBeenCalledTimes(1)
	})
})
