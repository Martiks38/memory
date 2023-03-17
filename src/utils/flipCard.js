/**
 * Flip over and keep/delete the touched card.
 *
 * @param {JSX.Element} element - Element contained within the letter.
 * @param {Function} onflip - Modify the state of the game.
 */

const flipCard = (element, onFlip) => {
	const card = element.closest('[data-flip]')

	const canFlip = card.dataset.flip
	if (canFlip !== 'true') return

	card.classList.toggle('flip')

	const img = card.querySelector('figure img')

	const nameImg = img.src.split('/').at(-1)
	const name = nameImg.split('.').at(0)

	const isFlip = card.classList.contains('flip')

	onFlip({ isFlip, cardName: name })
}

export default flipCard
