import React, { useEffect, useState } from 'react'
import millisecondsToMinutesSeconds from '@/utils/millisecondsToMinutesSeconds'
import { totalTime } from '@/consts/game'
import PropTypes from 'prop-types'

/**
 * @typedef {Object} GameState
 * @property {"victory" | "defeat"} status
 * @property {string[]} cardNames
 */

/**
 * @typedef {React.Dispatch<React.SetStateAction<GameState>>} SetGameState
 */

/**
 * Shows and manages the remaining time of the game.
 *
 * @Component
 * @param {Object} props
 * @property {number} props.initTime - Start time in milliseconds.
 * @property {"victory" | "defeat"} props.status - Indicate if you won or lost.
 * @param {SetGameState} props.onFinish - Game manager for when time is up.
 */

function ViewTime({ initTime, onFinish }) {
	const [time, setTime] = useState(totalTime)

	useEffect(() => {
		let leftTime

		if (time <= 0) {
			clearInterval(leftTime)

			setTime(totalTime)
			onFinish('defeat')
		}

		if (initTime !== 0) {
			leftTime = setInterval(() => {
				setTime((time) => time - 1000)
			}, 1000)
		}

		return () => clearInterval(leftTime)
	}, [initTime, time])

	const [minutes, seconds] = millisecondsToMinutesSeconds(time)

	return (
		<h1 className="mb-4 text-4xl text-center text-[#cd0300]" id="left-time-title">
			Tiempo restante {minutes}:{seconds}
		</h1>
	)
}

ViewTime.propTypes = {
	initTime: PropTypes.number,
	onFinish: PropTypes.func
}

export default ViewTime
