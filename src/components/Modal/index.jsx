import { useEffect } from 'react'
import { $ } from '../../utils/selectors'

/**
 * Modal container centered on the screen.
 *
 * @Component
 * @param {Object} props - Styles and content of the modal.
 * @property {JSX.Element | JSX.Element[]} props.children - Modal content - child elements.
 * @property {string} props.styles - List of classes in a string.
 */
function Modal({ children, styles }) {
  // useEffect(() => {
  //   const $modal = $('#modal')

  //   const resizeModal = () => {
  //     $modal.style.transform = 'scale() translate(-50%, -50%)'
  //   }

  //   window.addEventListener('resize')

  //   return () => {
  //     window.removeEventListener('resize')
  //     if ($modal) $modal.style.transform = 'none'
  //   }
  // }, [])

  return (
    <>
      <div
        className="absolute h-full w-full bg-black opacity-60 z-10"
        id="back-modal"
      ></div>
      <article
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 ${styles}`}
        id="modal"
      >
        {children}
      </article>
    </>
  )
}

export default Modal
