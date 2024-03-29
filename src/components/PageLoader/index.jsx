import React from 'react'
import loaderPage from '/loader-page.webp'

/** Fallback when changing route.
 *
 * @Component
 */
function PageLoader() {
	return (
		<div className="flex items-end justify-center w-full h-screen bg-black">
			<figure className="relative max-w-max w-4/5 h-auto rounded-lg overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full shadowLoader" />
				<img src={loaderPage} alt="" />
			</figure>
		</div>
	)
}

export default PageLoader
