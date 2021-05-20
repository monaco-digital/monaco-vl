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
				Well done! You have generated a grievance letter to send to your employer. Email this to yourself with the
				button below to fill in later. Then proceed to the next stage.
			</i>
		),
		_ET: (
			<i>
				Well done! You have generated a Grounds of Claim document to send to the tribunal. Email this to yourself with
				the button below to fill in later. Then proceed to the next stage.
			</i>
		),
		_RES: (
			<i>
				Well done! You have generated a further letter to send to your employer. Email this to yourself with the button
				below to fill in later. Then proceed to the next stage.
			</i>
		),
		_WP: (
			<i>
				Well done! You have completed stage 2 of 4 and generated a{' '}
				<a
					href="https://www.monacosolicitors.co.uk/negotiations/how-to-use-without-prejudice/"
					target="_blank"
					rel="nofollow noreferrer"
				>
					<b>without prejudice</b>
				</a>{' '}
				legal letter, below. Email this to yourself with the button below to fill in later. Then proceed to the next
				stage.
			</i>
		),
	};

	return (
		<div className="letter-explanation">
			<p>{lettersExplanationText[letterType]}</p>
		</div>
	);
};

export default PreviewLetterExplanation;
