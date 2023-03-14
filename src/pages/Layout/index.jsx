import React from 'react'
import Header from '../../components/Header'
import PropTypes from 'prop-types'

/**
 * Layout of the pages.
 *
 * @Component
 * @param {Object} props
 * @property {JSX.Element | JSX.Element[]} props.children - Content - child elements.
 */
function Layout({ children }) {
	return (
		<div className="max-h-screen">
			<Header />
			<main className="relative max-h-[calc(100vh_-_56px)] h-screen">{children}</main>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.array
}

export default Layout
