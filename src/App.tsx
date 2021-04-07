import React, { FC } from 'react';
import ReactGA from 'react-ga';
import TagManager from 'react-gtm-module';

import { BrowserRouter as Router } from 'react-router-dom';
import Client from './client/index';
import config from './config';

const { GA_PROPERTY_ID } = config;

const App: FC = () => {
	TagManager.initialize({
		gtmId: 'GTM-T5XNDHQ',
	});

	ReactGA.initialize(GA_PROPERTY_ID);
	ReactGA.pageview(window.location.pathname + window.location.search);

	return (
		<>
			<Router>
				<Client />
			</Router>
		</>
	);
};

export default App;
