import React, { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Screen from '../Screen'
import ScreenContext from '../../context'
import filters from '../../data/filters'

const Main = () => {
	const [screen, setScreen] = useState(0)
	const [activeFilters, setActiveFilters] = useState([])
	const [startFilterFlow, setStartFilterFlow] = useState(true)
	const [startParagraphPreviewFlow, setStartParagraphPreviewFlow] = useState(
		false
	)

	return (
		<ScreenContext.Provider
			value={{
				screen,
				setScreen,
				filters,
				activeFilters,
				setActiveFilters,
				startFilterFlow,
				setStartFilterFlow,
				startParagraphPreviewFlow,
				setStartParagraphPreviewFlow,
			}}
		>
			<main className="main">
				<Header />
				<Screen />
				<Footer />
			</main>
		</ScreenContext.Provider>
	)
}

export default Main
