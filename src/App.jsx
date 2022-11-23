import { Route, Switch } from 'wouter'

import React, { Suspense } from 'react'

import PageLoader from './components/PageLoader'

import './App.css'

const Home = React.lazy(() => import('./pages/Home'))
const Game = React.lazy(() => import('./pages/Game'))
const Error404 = React.lazy(() => import('./pages/Error404'))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/game/time_trial">
          <Game trial={true} />
        </Route>
        <Route path="/game" component={Game} />
        <Route path="/" component={Home} />
        <Route component={Error404} />
      </Switch>
    </Suspense>
  )
}

export default App
