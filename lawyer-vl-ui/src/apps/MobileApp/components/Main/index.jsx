import React, { useReducer } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Screen from '../Screen'
import ScreenContext from '../../context'
import reducer from '../../state/reducers'
import initialState from '../../state/initialState'

const Main = () => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<ScreenContext.Provider value={{ state, dispatch }}>
			<main className="main">
				<Header />
				<Screen />
				<Footer />
			</main>
		</ScreenContext.Provider>
	)
}

export default Main
