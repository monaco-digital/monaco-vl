import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Client from './client/index'
import ReactGA from 'react-ga'
import TagManager from 'react-gtm-module'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
	TagManager.initialize({
		gtmId: 'GTM-T5XNDHQ',
	})

	ReactGA.initialize('UA-66970592-3')
	ReactGA.pageview(window.location.pathname + window.location.search)

	return (
		<>
			<Router>
				<Client /> <ToastContainer />
			</Router>
		</>
	)
}

export default App
