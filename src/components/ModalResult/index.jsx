import React from 'react'
import Modal from '../Modal'
import Button from '../Button'
import ButtonLink from '../ButtonLink'
import millisecondsToMinutesSeconds from '../../utils/millisecondsToMinutesSeconds'
import { totalTime } from '../../consts/game'
import PropTypes from 'prop-types'

/**
 * Shows the result of the game.
 *
 * @Component
 * @param {Object} props - Statistics and game function.
 * @property {Object} props.dataGame - Game statistics.
 * @property {number} props.dataGame.time - Duration of the game.
 * @property {number} props.dataGame.flips - Number of flipped cards.
 * @property {"victory" | "defeat"} props.status - Indicates if you won the game.
 * @property {() => void} props.tryGame - Restart the game.
 */

function ModalResult({ dataGame, tryGame, status }) {
	const won = status === 'victory'

	const time = won ? dataGame.time : totalTime

	const [minutes, seconds] = millisecondsToMinutesSeconds(time)

	const title = won
		? 'Una victoria mínima, pero victoria al fin y al cabo.'
		: 'Oídos que resuenan, visión borrosa... el fin está cerca.'

	return (
		<Modal styles="text-2xl text-center text-black w-full h-full rounded-lg max-w-[620px] max-h-[425px]">
			<div className="relative top-0 left-0 mx-auto p-4 w-fit h-full" id="modal-img">
				<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
					<h1 className="absolute result__title shadowText leading-[normal]">{title}</h1>
					<div className="result__info">
						<ul>
							<li>
								Tiempo:{' '}
								<span className="text-[#ca0b0b]">
									{minutes}:{seconds}
								</span>
							</li>
							<li className="mt-4">
								Cartas volteadas: <span className="text-[#ca0b0b]">{dataGame.flips}</span>
							</li>
						</ul>
					</div>
					<div className="absolute flex justify-center items-center w-full result__buttons">
						<ButtonLink
							href="/"
							msg="Inicio"
							styles="flex items-center gap-[0.4em] font-inherit leading-[normal] btn-journal btn-journal_home"
						/>
						<Button
							msg="Volver a jugar"
							styles="flex items-center gap-[0.4em] font-inherit leading-[normal] btn-journal btn-journal_tryGame"
							onAction={tryGame}
						/>
					</div>
				</div>
				<img src="/journal_popup.webp" alt="" className="w-auto h-full object-contain" />
			</div>
		</Modal>
	)
}

ModalResult.propTypes = {
	dataGame: PropTypes.object,
	tryGame: PropTypes.func,
	status: PropTypes.string
}

export default ModalResult
