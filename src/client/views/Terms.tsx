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
				This service brought to you by Monaco Solicitors, a solicitors’ firm regulated by the Solicitors’ Regulation
				Authority. Please read these terms of use carefully.
			</p>
			<h2>General advice not specific legal advice</h2>
			<p>
				Through this service you are able to access a number of letters, including an advice letter, a without prejudice
				letter and a grievance letter. Those letters do not constitute specific legal advice, they only constitute
				general legal advice. If you need specific legal advice on the facts of your case then you should contact Monaco
				Solicitors and arrange to speak to one of our lawyers.
			</p>
			<h2>Free service</h2>
			<p>
				If you have generated a free letter, this is not intended to create a lawyer / client relationship. Where we
				have not signed a client care letter with you in writing then you are not our client, and you should not hold us
				out to be your lawyers to third parties.
			</p>
			<h2>For personal use only</h2>
			<p>
				This service is for personal use only. If you work at an organisation wishing to use this service for its own
				clients, please contact Monaco Solicitors and we will be very happy to hear from you. A non-personal licence may
				be very affordable, especially if you wish to contribute to the content.
			</p>
			<h2>Other</h2>
			<p>
				Our complaints policy is&nbsp;
				<Link href="https://www.monacosolicitors.co.uk/complaints/" target="_blank" rel="noopener noreferrer">
					here
				</Link>
				&nbsp;and our fee structures are&nbsp;
				<Link
					href="https://www.monacosolicitors.co.uk/legal-representation/"
					target="_blank"
					rel="noopener  noreferrer"
				>
					here
				</Link>
				. We always welcome feedback too, please email&nbsp;
				<Link href="mailto:communications@monacosolicitors.co.uk">communications@monacosolicitors.co.uk</Link> for any
				queries.
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
