import React from 'react'
import GridGame from '@/components/GridGame'
import Layout from '../Layout'
import PropTypes from 'prop-types'

/**
 * Container component of the game.
 *
 * @Component
 * @param {Object} props - By default, there is no time limit to find the pairs. Default trial = false.
 * @property {boolean} props.timeTrial - Indicates if the game is against the clock.
 */
function Game({ timeTrial = false }) {
	return (
		<Layout>
			<div className="grid place-content-center h-full w-full">
				<img
					src="/ruins.webp"
					alt=""
					className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover transitionGame -z-10"
					id="bgImageGame"
				/>
				<GridGame timeTrial={timeTrial} />
			</div>
		</Layout>
	)
}

Game.propTypes = {
	timeTrial: PropTypes.bool
}

export default Game
