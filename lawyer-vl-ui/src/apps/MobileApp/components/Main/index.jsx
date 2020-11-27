import React, { useReducer } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Screen from '../Screen'

const Main = () => {
	return (
		<main className="main">
			<Header />
			<Screen />
			{/* <Footer /> */}
		</main>
	)
}

export default Main
