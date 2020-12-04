import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import DesktopApp from './apps/DesktopApp'
import MobileApp from './apps/MobileApp'
import Client from './client/index'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/desktop">
					<DesktopApp />
				</Route>
				<Route path="/mobile">
					<MobileApp />
				</Route>
				<Route path="/client">
					<Client />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
