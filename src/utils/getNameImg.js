/**
 * Get the image name from the src attribute from a container of figure.
 *
 * @param {JSX.Element} parentCard - Card container.
 * @returns {string} - Image name.
 */
const getNameImg = (parentCard) => {
  let img = parentCard.querySelector('figure img')

  let name_img = img.src.split('/').at(-1)
  let name = name_img.split('.').at(0)

  return name
}

export default getNameImg
