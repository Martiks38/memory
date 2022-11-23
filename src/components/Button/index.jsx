/**
 * Presents a button, taking the passed message, styles, and action.
 *
 * @Component
 * @param {Object} props - Text, styles and action.
 * @property {string} props.msg - Text, string.
 * @property {string} props.styles - List of classes in a string.
 * @property {action} props.onAction - Button action, parameters: - event.
 */

function Button({ msg, styles, onAction }) {
  return (
    <button className={styles} onClick={onAction}>
      <span>{msg}</span>
    </button>
  )
}
/**
 * @callback action
 * @param {React.MouseEvent<HTMLButtonElement>} event
 */

export default Button
