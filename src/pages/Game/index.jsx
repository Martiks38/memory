import GridGame from '../../components/GridGame'
import Layout from '../Layout'

/**
 * Container component of the game.
 *
 * @Component
 * @param {Object} props - By default, there is no time limit to find the pairs. Default trial = false.
 * @property {boolean} props.trial - Indicates if the game is against the clock.
 */
function Game({ trial = false }) {
  return (
    <Layout>
      <div className="grid place-content-center h-full w-full">
        <img
          src="/ruins.webp"
          alt=""
          className="absolute top-1/2 -translate-y-1/2 w-full h-full object-cover transitionGame -z-10"
          id="bgImageGame"
        />
        <GridGame trial={trial} />
      </div>
    </Layout>
  )
}

export default Game
