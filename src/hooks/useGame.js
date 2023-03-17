import { useEffect, useRef, useState } from 'react'
import { $, $$ } from '@/utils/selectors'
import colorToGray from '@/utils/colorToGray'

const initialDataGame = {
	flips: 0,
	time: 0
}

export function useGame(timeTrial) {
	const [state, setState] = useState('playing')
	const [cardNames, setCardNames] = useState([])
	const dataGame = useRef(initialDataGame)

	useEffect(() => {
		if (!timeTrial) return

		let intervalRuins = null
		const $img = $('#bgImageGame')

		if ($img && dataGame.current.time === 0) $img.style.filter = 'grayscale(0)'

		if ($img && state === 'playing' && dataGame.current.time !== 0) {
			intervalRuins = colorToGray('#bgImageGame')
		}

		if (state !== 'playing') {
			clearInterval(intervalRuins)
		}

		return () => clearInterval(intervalRuins)
	}, [dataGame.current.time, state])

	useEffect(() => {
		let timeoutGame = null
		let timeoutWin = null

		if (cardNames.length !== 0) dataGame.current.flips += 1
		if (cardNames.length !== 2) return

		const $grid = $('#gameGrid')
		$grid.style.pointerEvents = 'none'

		timeoutGame = setTimeout(() => {
			let flippedCards = Array.from($$('.flip[data-flip="true"]'))
			const sameNames = new Set(cardNames).size === 1

			flippedCards.forEach((card) => {
				if (sameNames) {
					card.dataset.flip = 'false'
					card.classList.toggle('correct')
				} else {
					card.classList.toggle('flip')
				}
			})

			// You win if the total number of cards is equal to the number of cards turned over.
			const $totalFlip = $$('.flip').length
			const $totalCards = $$('.card').length

			const won = $totalCards - $totalFlip === 0

			if (won) {
				timeoutWin = setTimeout(() => {
					dataGame.current.time = Date.now() - dataGame.current.time

					setState('victory')
				}, 200)
			} else {
				setCardNames([])
			}

			$grid.style.pointerEvents = 'auto'
		}, 600)

		return () => {
			if (timeoutGame) clearTimeout(timeoutGame)
			if (timeoutWin) clearTimeout(timeoutWin)
		}
	}, [cardNames])

	const resetDataGame = () => {
		dataGame.current = { flips: 0, time: 0 }
		setState('playing')
		setCardNames([])
	}

	const initGameTime = () => {
		if (dataGame.current.time === 0) {
			setState('playing')
			dataGame.current.time = Date.now()
		}
	}

	const handleNameCards = ({ isFlip, cardName }) => {
		setCardNames((prevCards) => {
			const cardNames = isFlip ? prevCards.concat(cardName) : []

			return cardNames
		})
	}

	return {
		changeStateGame: setState,
		dataGame: dataGame.current,
		gameState: state,
		handleNameCards,
		initGameTime,
		resetDataGame
	}
}
