import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Link } from '@material-ui/core';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

const EmploymentTribunalExplanation: React.FC = () => {
	const history = useHistory();

	const handleNext = () => {
		history.push('/preview/_ET');
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={3} />
			<div className="step-intro">
				<Typography variant="body1" paragraph>
					So, your 3 month time limit is running out. As mentioned earlier, if you’re in this situation,{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/tribunals/commencing-the-acas-pre-claim-process-for-employment-tribunals/"
						target="_blank"
						rel="noopener"
						color="primary"
					>
						get in touch with ACAS.
					</Link>{' '}
					<p>
						You should also start putting together an employment tribunal claim (using the official ‘ET1’ online claim
						form for this purpose).
					</p>
				</Typography>
				<Typography variant="body1" paragraph>
					On the next page you can find a draft Grounds of Claim document. This is part of the ET1 online claim form
					which asks you to describe what happened to you.
					<p>You can send your completed ET1 claim form online to the employment tribunal.</p>
				</Typography>
				<ActionBar step={2} nextHandler={handleNext} />
			</div>
		</div>
	);
};

export default EmploymentTribunalExplanation;
