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
				<h2>Stage 3 complete!</h2>
				You have generated a grievance letter. First, email it to yourself to complete later. Once complete, you can
				send it to your employer or we can send it for you. Hit the NEXT button to proceed.
			</div>
		),
		_ET: (
			<div>
				<h2>Stage 3 complete!</h2>
				You have generated a Grounds of Claim document to send to the tribunal. First, email it to yourself to complete
				later. You will need to send this off yourself when you are ready. Hit the NEXT button to proceed.
			</div>
		),
		_RES: (
			<div>
				<h2>Stage 3 complete!</h2>
				<p>
					You have generated a second letter. First, email it to yourself to complete later. Once complete, you can send
					it to your employer or we can send it for you. Hit the NEXT button to proceed.
				</p>
				<p>
					When you are ready, you can move on to the next step to ask for help with any settlement offer that you have
					received.
				</p>
			</div>
		),
		_WP: (
			<div>
				<h2>Stage 2 complete!</h2> You have generated a{' '}
				<Link
					href="https://www.monacosolicitors.co.uk/negotiations/how-to-use-without-prejudice/"
					target="_blank"
					rel="nofollow noreferrer"
				>
					<b>without prejudice</b>
				</Link>{' '}
				letter. First, email it to yourself to complete later. Once complete, you can send it to your employer or we can
				send it for you. Hit the NEXT button to check out stage 3.
			</div>
		),
	};

	return <div className="letter-explanation">{lettersExplanationText[letterType]}</div>;
};

export default PreviewLetterExplanation;
