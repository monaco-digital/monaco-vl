import React from 'react'
import classNames from 'classnames'
interface Props {
	type?: string
	text?: string
	shortText?: string
	fn?: any
	extraClasses?: string
	rounded?: any
}

export const Button: React.FC<Props> = ({
	type = 'main',
	text,
	shortText,
	fn,
	extraClasses = '',
	rounded,
}) => {
	const buttonClasses = classNames(`${extraClasses} button`, {
		'button--has-short-text': shortText,
		[`button--${type}`]: type,
		'button--rounded': rounded,
	})

	return (
		<>
			<button
				className={buttonClasses}
				type="button"
				aria-label={shortText || text}
				onClick={params => fn(params)}
			>
				{shortText && <span className="button__short-text">{shortText}</span>}
				<span className="button__text">{text}</span>
			</button>
		</>
	)
}

export default Button
