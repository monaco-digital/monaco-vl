import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Main from './components/Main'
import './styles/main.output.css'

const MobileApp = () => {
	return (
		<HelmetProvider>
			<Helmet>
				<script
					defer
					src="https://kit.fontawesome.com/5bf6b27f09.js"
					crossorigin="anonymous"
				/>
			</Helmet>
			<Main />
		</HelmetProvider>
	)
}

export default MobileApp
