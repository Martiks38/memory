import React, { Link } from 'wouter'
import PropTypes from 'prop-types'

/**
 * It renders a button, taking the passed message, styles, and path.
 *
 * @Component
 * @param {Object} props - Text, styles and route.
 * @property {string} props.href - Internal page path.
 * @property {string} props.msg - Text.
 * @property {string} props.styles - List of classes in a string.
 */

function ButtonLink ({ href, msg, styles }) {
  return (
		<Link href={href}>
			<a className={styles}>
				<span>{msg}</span>
			</a>
		</Link>
  )
}

ButtonLink.propTypes = {
  href: PropTypes.string,
  msg: PropTypes.string,
  styles: PropTypes.string
}

export default ButtonLink
