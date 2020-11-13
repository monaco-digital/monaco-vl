import { createMuiTheme } from '@material-ui/core/styles'
import * as COLORS from './colors'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: COLORS.primary,
			dark: COLORS.primaryDark,
			contrastText: '#fff',
		},
		secondary: {
			main: COLORS.secondary,
			dark: COLORS.secondaryDark,
			contrastText: '#fff',
		},
		background: {
			default: COLORS.background,
			paper: COLORS.paper,
		},
	},

	typography: {
		h4: {
			fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif"',
			fontWeight: 800,
			fontSize: '2.2rem',
			lineHeight: 1.235,
			letterSpacing: '0.007em',
		},
	},
})

export default theme
