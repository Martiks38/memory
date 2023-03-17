import React from 'react'
import ButtonLink from '@/components/ButtonLink'
import Layout from '../Layout'

/** 404 error page.
 *
 * @Component
 */
function Error404() {
	return (
		<Layout>
			<article className="absolute w-80 h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_4px_5px_#ce0300] rounded-md md:w-[540px]">
				<div className="flex flex-col-reverse items-center justify-between gap-8 p-4 sm:flex-row">
					<figure className="basis-[200px]">
						<img src="/plague-error.webp" alt="" className="w-full h-full object-cover" />
					</figure>
					<div className="flex flex-col grow text-center text-redDD font-DwarvenAxe">
						<h1 className="text-3xl">404</h1>
						<div>
							<p className="text-2xl">Página no encontrada</p>
							<ButtonLink
								href="/"
								msg="INICIO"
								styles="block mt-3.5 text-2xl text-[#BFB37A] hover:underline"
							/>
						</div>
					</div>
				</div>
			</article>
		</Layout>
	)
}

export default Error404
