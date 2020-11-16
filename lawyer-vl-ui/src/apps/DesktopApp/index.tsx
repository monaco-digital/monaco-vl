import React from 'react'
import { Main } from './components/Main'
import { Provider } from 'react-redux'
import store from '../../data/store'
import theme from '../../theme'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const DesktopApp = () => {
	return (
		<Provider store={store}>
			<div className="App">
				<MuiThemeProvider theme={theme}>
					<CssBaseline>
						<Main />
					</CssBaseline>
				</MuiThemeProvider>
			</div>
		</Provider>
	)
}

export default DesktopApp
