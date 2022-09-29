import React from 'react';
import { Box, Fab, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ScrollToTopOnMount from '../components/common/ScrollToTopOnMount';

const Terms: React.FC = () => {
	const history = useHistory();

	return (
		<div className="termsSection" style={{ maxWidth: '900px' }}>
			<ScrollToTopOnMount />
			<h1>Terms of use</h1>
			<p>
				This service brought to you by Grapple Tech Ltd Company number: 14339842; address: Unit 6 Queens Yard, White
				Post Lane, London, United Kingdom, E9 5EN. Please read these terms of use carefully.
			</p>
			<h2>General advice not specific legal advice</h2>
			<p>
				Through this service you are able to access a number of letters, including an advice letter, a without prejudice
				letter and a grievance letter. Those letters do not constitute specific legal advice, they only constitute
				general legal advice. If you need specific legal advice on the facts of your case then you should contact us and
				ask to speak to one of our friendly partner law firms.
			</p>
			<h2>Free service</h2>
			<p>
				If you have used this service and generated a free letter, this is not intended to create any kind of lawyer /
				client relationship.
			</p>
			<h2>For personal use only</h2>
			<p>
				This service is for personal use only. If you work at an organisation wishing to use this service for its own
				clients, please contact us and we will be happy to discuss how we can help.
			</p>
			<h2>Data Protection</h2>
			<p>
				We comply with the Data Protection Act and GDPR legislation. Any data collected to enable us to provide our
				service is fairly and lawfully processed; it is the bare minimum data necessary; it is not kept for longer than
				necessary, it is secure, and it is not submitted to any other organization without your consent.
			</p>
			<h2>Cookie Policy</h2>
			<p>
				Cookies are small files of data held in your computer’s browser (eg Google Chrome or Internet Explorer). One
				example of cookie use is the use of Google Analytics whereby Google measures things like numbers of visitors to
				the site and amount of time spent on site.
			</p>
			<p>
				We also track back user journeys through our website to see what they do. This is so that we can continuously
				improve our website. If you wish to opt out of our Cookies policy just email us on
				enquiries@monacosolicitors.co.uk
			</p>
			<h2>Advertising Policy</h2>
			<p>
				We do advertise using services such as Google Adwords and Bing which display two kinds of adverts. One is the
				simple advert at the top of the Google results page which you can click on to get to our website. Another is
				‘display’ advertising, also known as ‘remarketing’.
			</p>
			<p>
				This means you may see our adverts on other websites which you visit. This is done by the use of a Cookie which
				your browser collects from our website and then it effectively tells the other website to display one of our
				adverts to you. Such Cookies are completely anonymous and not hold any personal data about you. If you wish to
				opt out of our advertising policy just email us.
			</p>
			<h2>Newsletters</h2>
			<p>
				We like to keep employees posted about negotiation tips and hints, as well as employee rights updates which may
				affect you. To this end, if you have contacted us and given us your email address then we intend to send you a
				newsletter every month or so. If you wish to unsubscribe just click the button in the email or email us.
			</p>

			<Box
				position="fixed"
				width="90%"
				maxWidth={904}
				bottom={16}
				zIndex={10}
				display="flex"
				flexDirection="row"
				justifyContent="flex-end"
			>
				<Box px={1}>
					<Fab variant="extended" color="inherit" onClick={() => history.goBack()}>
						Back
					</Fab>
				</Box>
			</Box>
		</div>
	);
};

export default Terms;
