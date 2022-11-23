import getNameImg from './getNameImg'

/**
 * Flip over and keep/delete the touched card.
 *
 * @param {JSX.Element} target - Element contained within the letter.
 * @param {Function} onflip - Modify the state of the game.
 */

const flipCard = (target, onFlip) => {
  let card = target.closest('[data-flip]')

  const canFlip = card.dataset.flip

  if (canFlip !== 'true') return

  card.classList.toggle('flip')

  onFlip((stateGame) => {
    let name = getNameImg(card)
    let isFlip = card.classList.contains('flip')

    let cardNames = isFlip
      ? stateGame.cardNames.concat(name)
      : stateGame.cardNames.slice(0, 0)

    return { ...stateGame, cardNames }
  })
}

export default flipCard
