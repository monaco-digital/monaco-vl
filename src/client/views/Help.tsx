import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Box, Fab } from '@material-ui/core';

function ScrollToTopOnMount() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
}

const Help: React.FC = () => {
	const history = useHistory();
	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: 'Opened help page',
		});
	}, []);

	return (
		<div className="helpsection" style={{ maxWidth: '904px' }}>
			<ScrollToTopOnMount />
			<h1>Virtual Lawyer help</h1>
			<h2>Monaco Solicitors</h2>
			<p>
				This app is created by{' '}
				<a href="https://www.monacosolicitors.co.uk/about-us/" target="_blank" rel="noopener noreferrer">
					Monaco Solicitors
				</a>
				. If you need Monaco Solicitors to review your case then you can find a contact form{' '}
				<a href="https://www.monacosolicitors.co.uk/contact-us/" target="_blank" rel="noopener noreferrer">
					here
				</a>
				. Alternatively if you complete this app (it only takes 5 minutes) there is a contact form at the end which you
				can use to send. The following guidance is produced by Monaco Solicitors:
			</p>
			<h2>Should I send a grievance letter or without prejudice letter?</h2>
			<p>
				If you&rsquo;ve completed this app, you think you may have a case, and you&rsquo;re still wondering about what
				to do.&nbsp;
			</p>
			<br />
			<p>
				Generally, if you want to keep your job, but you feel strongly enough about having been wronged, then send a{' '}
				<a href="https://www.monacosolicitors.co.uk/grievances/" target="_blank" rel="noopener noreferrer">
					grievance letter
				</a>
				, Here are some{' '}
				<a href="https://www.monacosolicitors.co.uk/templates/#grievances" target="_blank" rel="noopener noreferrer">
					example grievance letters
				</a>
				.&nbsp; Bear in mind that this could make it more difficult for you at work, especially in smaller companies. In
				bigger companies you may be able to transfer to a different department or team.
			</p>
			<br />
			<p>
				If you want to leave with a &lsquo;settlement agreement&rsquo; exit package deal, send a &lsquo;without
				prejudice&rsquo; letter.&nbsp; If that doesn&rsquo;t work you can send a grievance letter.
			</p>
			<br />
			<p>You can purchase bespoke templates for both of these letters at the end of this app.</p>
			<br />
			<p>
				If you do want to leave, and you need help completing your without prejudice letter template, read these
				articles:
			</p>
			<div>
				<ul>
					<li>
						<a
							href="https://www.monacosolicitors.co.uk/settlement-agreements/"
							target="_blank"
							rel="noopener noreferrer"
						>
							How much should I get
						</a>
					</li>
					<li>
						<a
							href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Settlement agreement calculator
						</a>
					</li>
					<li>
						<a href="https://www.monacosolicitors.co.uk/negotiations/" target="_blank" rel="noopener noreferrer">
							Negotiating
						</a>
					</li>
					<li>
						<a href="https://www.monacosolicitors.co.uk/evidence/" target="_blank" rel="noopener noreferrer">
							Evidence
						</a>
					</li>
					<li>
						<a
							href="https://www.monacosolicitors.co.uk/negotiations/how-to-use-without-prejudice/"
							target="_blank"
							rel="noopener noreferrer"
						>
							How to use without prejudice letters
						</a>
					</li>
					<li>
						<a href="https://www.monacosolicitors.co.uk/without-prejudice/" target="_blank" rel="noopener noreferrer">
							How to write without prejudice letters
						</a>
					</li>
					<li>
						<a
							href="https://www.monacosolicitors.co.uk/templates/#negotiations"
							target="_blank"
							rel="noopener noreferrer"
						>
							Example without prejudice letters
						</a>
					</li>
				</ul>
			</div>
			<h2>Assessing your employer&rsquo;s response to your without prejudice letter</h2>
			<p>Broadly speaking, there are 3 types of response which you might be met with:</p>
			<br />
			<h3>Complete denial</h3>
			<p>
				This can include writing back to you telling you how you have no hope at all and that they are not willing to
				negotiate. If this happens then it&rsquo;s time to escalate matters, see below.
			</p>
			<br />
			<h3>Partial denial</h3>
			<p>
				This can include writing back to you telling you how you have no hope at all and that they are not willing to
				negotiate, but then leaving a glimmer of hope. It could be inviting you to a meeting. It could be asking for
				more information in writing. At this point, you need to start responding to their specific queries. Often a
				negotiation process is hampered by misunderstandings in the facts, which can be ironed out by email. Our Do I
				have a case tool will provide you with a reading list for this process.
			</p>
			<br />
			<h3>No reply</h3>
			<p>
				Often an employer won&rsquo;t respond at all, or will acknowledge receipt of your letter but not get back to you
				properly. This is frustrating but you need to chase them. If you&rsquo;ve chased them then it&rsquo;s time to
				escalate matters, see below.
			</p>
			<h2>Why submit a grievance even if you are leaving your job</h2>
			<p>
				If you&rsquo;re still employed, you can submit a formal written grievance under your employer&rsquo;s internal
				procedure. A grievance is a statement of facts regarding what happened to you in the past.
			</p>
			<p>
				Writing a grievance lets your employer know that you are not planning to give up, so it&rsquo;s another reason
				for them to offer you a settlement. You can send a without prejudice letter first, and if that doesn&rsquo;t
				work you can submit a grievance.
			</p>
			<h2>Data subject access requests</h2>
			<p>
				Another effective method of encouraging your employer to enter into a settlement agreement with you is to raise
				a data subject access request, which you can read about{' '}
				<a
					href="https://www.monacosolicitors.co.uk/evidence/subject-access-requests/"
					target="_blank"
					rel="noopener noreferrer"
				>
					here
				</a>
				. You can also see our example DSAR&rsquo;s{' '}
				<a
					href="https://www.monacosolicitors.co.uk/templates/#subject-access-requests"
					target="_blank"
					rel="noopener noreferrer"
				>
					here
				</a>
				.
			</p>
			<p>
				A DSAR is a request of all the information which your employer holds relating to you, including for example
				internal emails where they may have been bad mouthing you.
			</p>
			<h2>Going to an employment tribunal</h2>
			<p>
				It is very important that you obtain a certificate from &lsquo;ACAS&rsquo; before your 3 month time limit has
				expired. You can read about how to do that{' '}
				<a
					href="https://www.monacosolicitors.co.uk/tribunals/commencing-the-acas-pre-claim-process-for-employment-tribunals/"
					target="_blank"
					rel="noopener noreferrer"
				>
					here
				</a>{' '}
				and you can read about 3 month time limits{' '}
				<a href="https://www.monacosolicitors.co.uk/tribunals/time-limits/" target="_blank" rel="noopener noreferrer">
					here
				</a>
				.
			</p>
			<p>
				Once you have your ACAS certificate, you will have up to a month to issue an Employment Tribunal claim. You can
				read about how to do that{' '}
				<a href="https://www.monacosolicitors.co.uk/tribunals/" target="_blank" rel="noopener noreferrer">
					here
				</a>{' '}
				and you can see our example Employment Tribunal claim documents{' '}
				<a href="https://www.monacosolicitors.co.uk/templates/#tribunals" target="_blank" rel="noopener noreferrer">
					here
				</a>
				.
			</p>
			<h2>Settlement agreement offers</h2>
			<p>
				If at any stage you get offered a settlement agreement then try to play it cool. Don&rsquo;t accept the first
				offer they make. Read our article on how much you should get{' '}
				<a href="https://www.monacosolicitors.co.uk/settlement-agreements/" target="_blank" rel="noopener noreferrer">
					here
				</a>
				, and read the guidance on our calculator page{' '}
				<a
					href="https://www.monacosolicitors.co.uk/free-settlement-agreement-calculator/"
					target="_blank"
					rel="noopener noreferrer"
				>
					here
				</a>
				.
			</p>
			<p>
				And once you have received a settlement offer contact Monaco Solicitors for a free consultation and we will be
				able to represent you, either to increase the amount or to review and sign the settlement agreement document
				itself.
			</p>
			<p>
				This is because there is always an amount of money for legal fees, set out in the settlement agreement document
				itself, which is for the legal costs of going through this lengthy document with you. This does not result in
				any additional cost to you, as your lawyer will invoice the employer separately for this.
			</p>
			<p>
				We would then go through it in detail with you, and discuss whether you should try to negotiate an increased
				amount. We might be able to do this on a no win no fee basis.
			</p>
			<p>
				Once you are happy with the deal set out in the document, we would countersign it to confirm that all of the
				legal wording in the document has been explained to you in plain English.&nbsp;
			</p>
			<div className="italic text-ms-gray text-sm mt-12">
				<p>Virtual Lawyer has been created by Monaco Solicitors, Contact details</p>
				<p>Tel: 020 7717 5259</p>
				<p>Email: communications@monacosolicitors.co.uk</p>
				<p>
					Address: Monaco Solicitors, Level 24, The Shard, 32 London Bridge St, London SE1 9SG (meetings by appointment
					only)
				</p>
				<p>Registered company no: 08487857</p>
				<p>Registered office: Unit 502, Peckham Levels, 95a Rye Lane, London, SE15 4ST</p>
				<p>Regulated by Solicitors Regulation Authority ID no: 621671</p>
			</div>

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

export default Help;
