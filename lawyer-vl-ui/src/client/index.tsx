import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import store from '../data/store'
import '../client/styles/main.output.css'
import Main from './views'

const MobileApp = () => {
	return (
		<Provider store={store}>
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
