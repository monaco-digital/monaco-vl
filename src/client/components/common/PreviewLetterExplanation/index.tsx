import React from 'react';

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
			<i>
				<h2>Stage 3 complete!</h2>
				You have generated a grievance letter. First, email it to yourself to complete later. Once complete, you can
				send it to your employer or we can send it for you. Hit the NEXT button to proceed.
			</i>
		),
		_ET: (
			<p>
				<h2>Stage 3 complete!</h2>
				You have generated a Grounds of Claim document to send to the tribunal. First, email it to yourself to complete
				later. You will need to send this off yourself when you are ready. Hit the NEXT button to proceed.
			</p>
		),
		_RES: (
			<p>
				<h2>Stage 3 complete!</h2>
				You have generated a second letter. First, email it to yourself to complete later. Once complete, you can send
				it to your employer or we can send it for you. Hit the NEXT button to proceed.
			</p>
		),
		_WP: (
			<p>
				<h2>Stage 2 complete!</h2> You have generated a{' '}
				<a
					href="https://www.monacosolicitors.co.uk/negotiations/how-to-use-without-prejudice/"
					target="_blank"
					rel="nofollow noreferrer"
				>
					<b>without prejudice</b>
				</a>{' '}
				letter. First, email it to yourself to complete later. Once complete, you can send it to your employer or we can
				send it for you. Hit the NEXT button to check out stage 3.
			</p>
		),
	};

	return (
		<div className="letter-explanation">
			<p>{lettersExplanationText[letterType]}</p>
		</div>
	);
};

export default PreviewLetterExplanation;
