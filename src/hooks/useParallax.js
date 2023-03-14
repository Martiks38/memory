import { useEffect } from 'react'

export function useParallax({ containerSelector, elementSelector }) {
	useEffect(() => {
		// Prefers reduced motion
		const query = 'prefers-reduced-motion: reduce'
		const mediaWindow = window.matchMedia(query)

		if (mediaWindow.matches) return

		// Animation hamlet
		const containerHamlet = document.querySelector(containerSelector)

		const hamlet = document.querySelector(elementSelector)

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
}
