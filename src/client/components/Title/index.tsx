import React from 'react'

interface Props {
	text: any
}
const Title: React.FC<Props> = ({ text }: Props) => {
	const heading = text?.text
	const subHeading = text?.subtext

	return (
		<>
			{heading && <h1 className="title">{heading}</h1>}
			{heading && <p className="title__subheading">{subHeading}</p>}
		</>
	)
}

export default Title
