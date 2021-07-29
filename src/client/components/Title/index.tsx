import React from 'react';

interface Props {
	heading: string;
	subheading: string;
}
const Title: React.FC<Props> = ({ heading, subheading }: Props) => {
	return (
		<div className="title">
			{heading && <h1>{heading}</h1>}
			{subheading !== '' && <p className="title__subheading">{subheading}</p>}
		</div>
	);
};

export default Title;
