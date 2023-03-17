import React, { Suspense, useMemo } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import Card from '../Card'
import Modal from '../Modal'
import ViewTime from '../ViewTime'
import { useGame } from '@/hooks/useGame'
import generateGame from '@/utils/generateGame'

const ModalResult = React.lazy(() => import('../ModalResult'))

/**
 * Card matrix and game state container.
 *
 * @Component
 * @param {Object} props
 * @param {boolean} props.timeTrial - Indicates if the game is against the clock.
 */
function GridGame({ timeTrial }) {
	const { gameState, changeStateGame, dataGame, initGameTime, resetDataGame, handleNameCards } =
		useGame(timeTrial)

	const grid = useMemo(() => {
		if (gameState === 'playing') return generateGame.generateMatrix()

		return []
	}, [gameState])

	return (
		<>
			<Suspense
				fallback={
					<Modal isClose={false}>
						<figure className="h-48 w-80">
							<img src="/loader.gif" alt="" className="object-fit" />
						</figure>
					</Modal>
				}
			>
				{gameState === 'victory' || gameState === 'defeat' ? (
					<ModalResult dataGame={dataGame} tryGame={resetDataGame} status={gameState} />
				) : null}
			</Suspense>
			{timeTrial && gameState === 'playing' ? (
				<ViewTime initTime={dataGame.time} onFinish={changeStateGame} />
			) : null}
			<div
				className={clsx([
					'grid grid-rows-6 grid-cols-6 gap-2 max-h-[80vmin] max-w-[80vmin] min-h-[70vmin] min-w-[70vmin]',
					{ 'z-10': gameState === 'playing' }
				])}
				id="gameGrid"
				onClick={() => initGameTime(dataGame.time)}
				data-testid="container-gameGrid"
			>
				{grid.map((card) => (
					<Card key={card.id} src={card.url_img} onFlip={handleNameCards} />
				))}
			</div>
		</>
	)
}

GridGame.propTypes = {
	timeTrial: PropTypes.bool
}

export default GridGame
