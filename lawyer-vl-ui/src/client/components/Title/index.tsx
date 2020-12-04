import React from 'react'

interface Props {
	text: any
}
const Title: React.FC<Props> = ({ text }) => {
	const heading = text?.heading
	const subHeading = text?.subHeading

	return (
		<>
			{heading && <h1 className="title">{heading}</h1>}
			{heading && <p className="title__subheading">{subHeading}</p>}
		</>
	)
}

export default Title
