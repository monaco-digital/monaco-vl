import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from '../data/store'
import '../client/styles/main.output.css'
import Main from './views/Main'

const MobileApp = () => {
	return (
		<Provider store={store}>
			<HelmetProvider>
				<Helmet>
					<script
						defer
						src="https://kit.fontawesome.com/5bf6b27f09.js"
						crossOrigin="anonymous"
					/>
				</Helmet>
				<Main />
			</HelmetProvider>
		</Provider>
	)
}

export default MobileApp
