import React from 'react';
import { Box, Fab } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Terms: React.FC = () => {
	const history = useHistory();

	return (
		<div className="termsSection" style={{ maxWidth: '900px' }}>
			<h1>Virtual Lawyer terms of use</h1>
			<p>
				Virtual Lawyer is a web app created and run as part of Monaco Solicitors, a solicitors&rsquo; firm regulated by
				the Solicitors&rsquo; Regulation Authority. Please read these terms of use carefully.
			</p>
			<h2>General advice not specific legal advice</h2>
			<p>
				Through Virtual Lawyer you are able to access a number of letters, including an advice letter, a without
				prejudice letter and a grievance letter. Those letters do not constitute specific legal advice, they only
				constitute general legal advice. If you need specific legal advice on the facts of your case then you should
				contact us and arrange to speak to one of our lawyers.
			</p>
			<h2>No client / lawyer relationship</h2>
			<p>
				Whether you paid for a draft letter template or generated a free letter, nothing in Virtual Lawyer&rsquo;s
				automated services is intended to create a lawyer / client relationship. Where we have not signed a client care
				letter with you in writing then you are not our client, and you should not hold us out to be your lawyers to
				third parties.
			</p>
			<h2>For personal use only</h2>
			<p>
				Virtual Lawyer is for personal use only. If you work at an organisation wishing to use Virtual Lawyer for its
				own clients, please contact Monaco Solicitors and we will be very happy to hear from you. A non-personal licence
				may be very affordable, especially if you wish to contribute to the content of Virtual Lawyer.
			</p>
			<h2>Other</h2>
			<p>
				Our complaints policy is&nbsp;
				<a href="https://www.monacosolicitors.co.uk/complaints/" target="_blank" rel="noopener noreferrer">
					here
				</a>
				&nbsp;and our fee structures are&nbsp;
				<a href="https://www.monacosolicitors.co.uk/legal-representation/" target="_blank" rel="noopener  noreferrer">
					here
				</a>
				. We always welcome feedback too, please email&nbsp;
				<a href="mailto:communications@monacosolicitors.co.uk">communications@monacosolicitors.co.uk</a> for any
				queries.
			</p>
			<div className="italic text-ms-gray text-sm mt-12">
				<p>Virtual Lawyer has been created by Monaco Solicitors, Contact details</p>
				<p>Tel: 020 7717 5259</p>
				<p>
					Email: <a href="mailto:communications@monacosolicitors.co.uk">communications@monacosolicitors.co.uk</a>
				</p>
				<p>
					Address: Monaco Solicitors, Level 24, The Shard, 32 London Bridge St, London SE1 9SG (meetings by appointment
					only)
				</p>
				<p>Registered company no: 08487857</p>
				<p>Registered office: Unit 502, Peckham Levels, 95a Rye Lane, London, SE15 4ST</p>
				<p>Regulated by Solicitors Regulation Authority ID no: 621671</p>
			</div>
			<br />
			{/* Start of SRA Digital Badge code
				Code taken from https://www.yoshki.com/sra/ and adapted to React
			*/}
			<div
				style={{
					maxWidth: '275px',
					maxHeight: '163px',
				}}
			>
				<div
					style={{
						position: 'relative',
						paddingBottom: '59.1%',
						height: 'auto',
						overflow: 'hidden',
					}}
				>
					<iframe
						title="SRA Badge"
						frameBorder="0"
						scrolling="no"
						allowTransparency
						src="https://cdn.yoshki.com/iframe/55845r.html"
						style={{
							border: '0px',
							margin: '0px',
							padding: '0px',
							backgroundColor: 'transparent',
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%',
							position: 'absolute',
						}}
					/>
				</div>
			</div>
			{/* End of SRA Digital Badge code  */}

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
