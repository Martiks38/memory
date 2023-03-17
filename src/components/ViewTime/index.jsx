import React from 'react'
import millisecondsToMinutesSeconds from '@/utils/millisecondsToMinutesSeconds'
import { totalTime } from '@/consts/game'
import PropTypes from 'prop-types'
import { useCountdown } from '@/hooks/useCountdown'

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
	const time = useCountdown({ initTime, totalTime, onFinish })

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
