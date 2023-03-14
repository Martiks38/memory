/**
 * Get the image name from the src attribute from a container of figure.
 *
 * @param {JSX.Element} parentCard - Card container.
 * @returns {string} - Image name.
 */
const getNameImg = (parentCard) => {
  const img = parentCard.querySelector('figure img')

  const name_img = img.src.split('/').at(-1)
  const name = name_img.split('.').at(0)

  return name
}

export default getNameImg
