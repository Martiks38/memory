import { useEffect, useState } from 'react'

import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'

import { total_time } from '../../consts/game'

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
  const [time, setTime] = useState(total_time)

  useEffect(() => {
    let left_time = null

    if (time <= 0) {
      clearInterval(left_time)

      setTime(total_time)
      onFinish((stateGame) => {
        return { ...stateGame, status: 'defeat' }
      })
    }

    if (initTime !== 0) {
      left_time = setInterval(() => {
        setTime((time) => time - 1000)
      }, 1000)
    }

    return () => {
      if (left_time) clearInterval(left_time)
    }
  }, [initTime, time])

  let [minutes, seconds] = millisecondsToMinutesSeconds(time)

  return (
    <h1
      className="mb-4 text-4xl text-center text-[#cd0300]"
      id="left-time-title"
    >
      Tiempo restante {minutes}:{seconds}
    </h1>
  )
}

export default ViewTime
