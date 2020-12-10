import React from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Client from './client/index'

function App() {
	return (
		<>
			<Client /> <ToastContainer />
		</>
	)
}

export default App
