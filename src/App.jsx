import React, { Suspense } from 'react'
import { Route, Switch } from 'wouter'
import PageLoader from '@/components/PageLoader'
import './App.css'
import Home from './pages/Home'

const Error404 = React.lazy(() => import('@/pages/Error404'))
const Game = React.lazy(() => import('@/pages/Game'))

function App() {
	return (
		<Switch>
			<Route path="/" component={Home} />
			<Suspense fallback={<PageLoader />}>
				<Route path="/game/time_trial">
					<Game timeTrial={true} />
				</Route>
				<Route path="/game" component={Game} />
				<Route component={Error404} />
			</Suspense>
		</Switch>
	)
}

export default App
