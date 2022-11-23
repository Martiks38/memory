import Header from '../../components/Header'

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
      <main className="relative max-h-[calc(100vh_-_56px)] h-screen">
        {children}
      </main>
    </div>
  )
}

export default Layout
