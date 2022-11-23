import { Link } from 'wouter'

import ButtonLink from '../ButtonLink'

/** Page header.
 *
 * @Component
 */
function Header() {
  return (
    <header className="bg-[#1a1a1a]">
      <div className="flex justify-between items-center mx-auto px-10 py-2 w-full max-w-75 xl:px-0">
        <Link href="/">
          <a className="block w-fit">
            <figure className="h-10">
              <img
                src="/logo.webp"
                alt=""
                className="h-full w-auto object-cover"
              />
            </figure>
          </a>
        </Link>
        <ButtonLink href="/" msg="Inicio" styles="text-2xl text-redDD" />
      </div>
    </header>
  )
}

export default Header
