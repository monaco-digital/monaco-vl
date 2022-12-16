import React from 'react';
import { mdiNumeric4Circle } from '@mdi/js';
import Icon from '@mdi/react';
import { Link, Typography } from '@material-ui/core';

import EndToEndStepper from '../EndToEndStepper';

export const Settlement: React.FC = () => {
	const iconColour = '#60ABFF';
	const iconSize = 1.2;

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
						If you’ve taken the previous steps to advance your case, please feel free to use the form on the on the next
						page if you’d like a member of our team call you.
					</p>
					<br />
					<p>For example, you may require our services if:</p>
					<Typography variant="body1" paragraph component="div">
						<ul className="list-disc">
							<li>You have received a settlement offer</li>
							<li>You would like a callback about your case</li>
						</ul>
					</Typography>
					<h2>I have received a settlement offer</h2>
					<p>
						Contact Monaco Solicitors for a free consultation and we will be able to represent you, either to increase
						the amount or to review and sign the settlement agreement document itself.
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
						We would then go through the settlement agreement in detail with you and discuss whether you should try to
						negotiate an increased amount.
					</p>
					<br />
					<p>We might be able to do this on your behalf on a no win no fee basis.</p>
					<br />
					<p>
						Once you are happy with the deal set out in the settlement agreement document, we would countersign it to
						confirm that all of the legal wording in the document has been explained to you in plain English.{' '}
					</p>
					<br />
				</Typography>
			</div>
		</div>
	);
};

export default Settlement;
