import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Screen from '../Screen'
import ScreenContext from '../../context'
import filters from '../../data/filters'

const Main = () => {
	const [screen, setScreen] = useState(0)

	return (
		<ScreenContext.Provider value={{ screen, setScreen, filters }}>
			<main className="main">
				<Header />
				<Screen />
				<Footer />
			</main>
		</ScreenContext.Provider>
	)
}

export default Main
