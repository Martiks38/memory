/**
 * Change the gray scale of an image.
 *
 * @param {string} selectorImage - DOM element selector.
 * @param {number} [interval=30000] - Time steps
 * @returns {number} Interval ID.
 */
const colorToGray = (selectorImage, interval = 30000) => {
  const $image = document.querySelector(selectorImage)
  let scale = 0

  const id_interval = setInterval(() => {
    scale += 1
    $image.style.filter = `grayscale(${Math.min(scale / 10, 1)})`
  }, interval)

  return id_interval
}

export default colorToGray
