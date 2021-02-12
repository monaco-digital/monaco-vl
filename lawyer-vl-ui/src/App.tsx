import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Client from './client/index'
import ReactGA from 'react-ga'

function App() {
	ReactGA.initialize('UA-66970592-3')
	ReactGA.pageview(window.location.pathname + window.location.search)

	return (
		<>
			<Client /> <ToastContainer />
		</>
	)
}

export default App
