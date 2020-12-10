import React from 'react'
import classNames from 'classnames'
interface Props {
	type?: string
	text?: string
	shortText?: string
	fn?: any
	extraClasses?: string
	rounded?: any
	color?: string
}

export const Button: React.FC<Props> = ({
	type = 'main',
	text,
	shortText,
	fn,
	extraClasses = '',
	rounded,
	color,
}) => {
	const classes = classNames(
		`${extraClasses} button`,
		{
			'button--main': type === 'main',
		},
		{
			'button--secondary': type === 'secondary',
		},
		{
			'button--tertiary': type === 'tertiary',
		},
		{
			'button--danger': type === 'danger',
		},
		{
			'button--green': type === 'green',
		},
		{
			'button--rounded': rounded,
		},
		{
			'button--small': type === 'small',
		}
	)
	return (
		<>
			<button
				className={classes + ' mobile'}
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
