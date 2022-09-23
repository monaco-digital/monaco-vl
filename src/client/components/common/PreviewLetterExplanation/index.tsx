import React from 'react';
import { Link } from '@material-ui/core';

interface Props {
	letter: string;
}

const PreviewLetterExplanation: React.FC<Props> = ({ letter }: Props) => {
	let letterType = letter;
	if (letter.startsWith('_RES')) {
		letterType = '_RES';
	}

	const lettersExplanationText = {
		_GR: (
			<div>
				<h2>Grievance letter generated</h2>
				<p>
					You have generated a grievance letter. First, download it to to complete later. Once complete, you can send it
					to your employer.
				</p>
				<p>
					When your ready, you can move onto the next step to request assistance with any settlement offer that you have
					received.
				</p>
			</div>
		),
		_ET: (
			<div>
				<h2>Grounds of Claim document generated</h2>
				<p>
					You have generated a Grounds of Claim document to to include as part of your ET1 online tribunal claim form.
				</p>
				<p>
					First, download the document to complete later. You will need to send this off yourself when you are ready.
				</p>
				<p>
					When you are ready, you can move on to the next step, which is to ask for advice should you receive an
					out-of-court settlement offer.
				</p>
			</div>
		),
		_RES: (
			<div>
				<h2>Second letter generated</h2>
				<p>
					You have generated a second letter. Download your letter before moving on to the next step. Once you have
					completed the letter by filling in any gaps, you can send it to your employer.
				</p>
				<p>
					When you are ready, you can move on to the next step to ask for help with any settlement offer that you have
					received.
				</p>
			</div>
		),
		_WP: (
			<div>
				<h2>Without Prejudice letter generated</h2>{' '}
				<p>
					Download your{' '}
					<Link
						href="https://www.monacosolicitors.co.uk/negotiations/how-to-use-without-prejudice/"
						target="_blank"
						rel="nofollow noreferrer"
					>
						<b>Without Prejudice</b>
					</Link>{' '}
					letter before moving on to the next step.
				</p>
				<p>Once completed, you can send it to your employer.</p>
				<p>
					Copy in our employment lawyers, Monaco Solicitors in on the email if you’d like advice on your settlement
					offer once you have received one.
				</p>
				<p>
					You are legally required to take independent advice on your settlement agreement and to have it ‘signed off’
					by a solicitor or other suitably qualified authority.
				</p>
				<p>
					There is no cost to you for Monaco Solicitors to advise you on your settlement agreement and to sign it off.
					The cost is covered by your employer.
				</p>
			</div>
		),
	};

	return <div className="letter-explanation">{lettersExplanationText[letterType]}</div>;
};

export default PreviewLetterExplanation;
