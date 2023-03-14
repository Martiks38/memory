import React, { useEffect } from 'react'
import ButtonLink from '../../components/ButtonLink'
import Layout from '../Layout'

/** Home page.
 *
 * @Component
 */
function Home () {
  useEffect(() => {
    // Prefers reduced motion
    const query = 'prefers-reduced-motion: reduce'
    const mediaWindow = window.matchMedia(query)

    if (mediaWindow.matches) return

    // Animation hamlet
    const containerHamlet = document.querySelector('#containerHamlet')

    const hamlet = document.querySelector('#hamlet')

    const { height } = hamlet.getBoundingClientRect()
    const halfHeight = height / 2

    const parallaxY = (event) => {
      const { offsetY } = event
      const translateY = ((offsetY - halfHeight) / halfHeight) * 5

      hamlet.style.transform = `translateY(${translateY}px)`
    }

    const resetParallaxY = () => {
      hamlet.style.transform = 'translateY(0px)'
    }

    containerHamlet.addEventListener('mousemove', parallaxY)
    containerHamlet.addEventListener('mouseleave', resetParallaxY)

    return () => {
      containerHamlet.removeEventListener('mousemove', parallaxY)
      containerHamlet.removeEventListener('mouseleave', resetParallaxY)
    }
  }, [])

  return (
		<Layout>
			<div className="h-full w-full overflow-hidden" id="containerHamlet">
				<figure className="relative shadowTop">
					<img
						src="/hamlet.webp"
						alt=""
						className="min-h-screen h-full w-full object-cover object-center"
						id="hamlet"
					/>
				</figure>
			</div>
			<div className="absolute top-1/2 left-1/2 text-xl font-medium -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-wrap justify-center gap-8 mx-auto w-fit font-inherit sm:flex-nowrap">
					<ButtonLink
						href="/game"
						msg="Jugar"
						styles="rounded-md px-3 py-2 bg-black shadow-red text-[#ce0300] border-2 border-transparent hover:shadow-none hover:border-[#f2852c] hover:text-[#f2852c]"
					/>
					<ButtonLink
						href="/game/time_trial"
						msg="Jugar contrarreloj"
						styles="rounded-md px-3 py-2 bg-black shadow-red text-[#ce0300] border-2 border-transparent hover:shadow-none hover:border-[#f2852c] hover:text-[#f2852c]"
					/>
				</div>
			</div>
		</Layout>
  )
}

export default Home
