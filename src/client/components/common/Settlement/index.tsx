import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

export const Settlement: React.FC = () => {
	const history = useHistory();
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

	const handleGoForward = () => {
		history.push('/step/cdf/form');
	};

	return (
		<div className="flex-col w-full">
			<EndToEndStepper step={3} />
			<div className="step-intro">
				<div className="step-intro__icon-and-header">
					<Icon
						path={mdiNumeric4Circle}
						title="4 icon"
						size={iconSize}
						color={iconColour}
						className="step-intro__number-icon"
					/>
					<Typography variant="h4">Agree settlement</Typography>
				</div>
				<Typography variant="body1" paragraph>
					<br />
					<p>
						If you’ve taken the previous steps to advance your case and you have received a settlement offer, please
						feel free to contact us using the email button on the next page and a member of our team will contact you to
						arrange a free consultation with our specialist employment lawyers, Monaco Solicitors.
					</p>
					<br />
					<p>
						Monaco Solicitors will be able to represent you, either to increase the amount or to review and sign the
						settlement agreement document itself.
					</p>
					<br />
					<p>
						There is always an amount of money for legal fees, set out in the settlement agreement document itself. This
						sum is to cover the legal costs of going through the lengthy settlement agreement document with you.
					</p>
					<br />
					<p>
						Reviewing and advising you on your settlement agreement does not cost you anything. Your lawyer would
						invoice your employer separately for this.
					</p>
					<br />
					<p>
						Monaco Solicitors would then go through the settlement agreement in detail with you and discuss whether you
						should try to negotiate an increased amount.
					</p>
					<br />
					<p>Monaco Solicitors might be able to do this on your behalf on a no win no fee basis.</p>
					<br />
					<p>
						Once you are happy with the deal set out in the settlement agreement document, Monaco Solicitors would
						countersign it to confirm that all of the legal wording in the document has been explained to you in plain
						English.
					</p>
					<br />
					<br />
				</Typography>

				<ActionBar step={3} nextHandler={handleGoForward} />
			</div>
		</div>
	);
};

export default Settlement;
