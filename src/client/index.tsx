import React, { FC } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import store from '../data/store';
import './styles/main.output.css';
import Main from './views';

const breakpoints = createBreakpoints({}); // For having different styles based on screen size

// For 'reasons' some screens (Payment and Email Modals) are using Material UI while everything else uses Tailwind
// A change off of tailwind is likely in the future, Material UI is not confirmed though.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#538cff',
			contrastText: '#fff',
		},
		secondary: {
			main: '#68c170',
			contrastText: '#fff',
		},
		background: {
			paper: '#fafafa',
		},
	},
	typography: {
		fontFamily: [
			'Montserrat',
			'system-ui',
			'BlinkMacSystemFont',
			'-apple-system',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			'sans-serif',
		].join(','),
		h1: {
			fontSize: '48px',
			fontWeight: 'bold',
			letterSpacing: '-60',
			[breakpoints.up('md')]: {
				fontSize: '60px',
			},
		},
		h2: {
			fontSize: '38px',
			fontWeight: 500, // medium
			letterSpacing: '-50',
			[breakpoints.up('md')]: {
				fontSize: '48px',
			},
		},
		h3: {
			fontSize: '28px',
			fontWeight: 'bold',
			letterSpacing: '-50',
			[breakpoints.up('md')]: {
				fontSize: '36px',
			},
		},
		h4: {
			fontSize: '19px',
			fontWeight: 'bold',
			letterSpacing: '-50',
			[breakpoints.up('md')]: {
				fontSize: '24px',
			},
		},
		h5: {
			fontSize: '17px',
			fontWeight: 500, // medium
			letterSpacing: '-50',
			[breakpoints.up('md')]: {
				fontSize: '21px',
			},
		},
		body1: {
			fontSize: '13px',
			fontWeight: 'normal',
			letterSpacing: '0',
			[breakpoints.up('md')]: {
				fontSize: '16px',
			},
		},
		body2: {
			fontSize: '11.5px',
			fontWeight: 'normal',
			letterSpacing: '0',
			[breakpoints.up('md')]: {
				fontSize: '14px',
				letterSpacing: '0.25',
			},
		},
	},

	overrides: {
		// Our background color and paper color are reversed. This fixes input backgrounds within paper to always be white
		MuiPaper: {
			root: {
				'& .MuiOutlinedInput-root': {
					backgroundColor: '#fff',
				},
			},
		},
		MuiButton: {
			root: {
				textTransform: 'none',
			},
		},
	},
});

const MobileApp: FC = () => (
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<HelmetProvider>
				<Helmet>
					<title>Virtual Lawyer</title>
					<script>
						{`(function(h,o,t,j,a,r){
								h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
								h._hjSettings={hjid:2131691,hjsv:6};
								a=o.getElementsByTagName('head')[0];
								r=o.createElement('script');r.async=1;
								r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
								a.appendChild(r);
							})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
					</script>
					<script defer src="https://kit.fontawesome.com/5bf6b27f09.js" crossOrigin="anonymous" />
				</Helmet>
				<Main />
			</HelmetProvider>
		</ThemeProvider>
	</Provider>
);

export default MobileApp;
