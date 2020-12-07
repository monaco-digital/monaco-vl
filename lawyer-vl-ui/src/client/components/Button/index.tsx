import React from 'react'
import classNames from 'classnames'
interface Props {
	type?: string
	text?: string
	fn?: any
	extraClasses?: string
	rounded?: any
}

export const Button: React.FC<Props> = ({
	type = 'main',
	text,
	fn,
	extraClasses = '',
	rounded,
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
			'button--neutral': type === 'tertiary',
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
		<button
			className={classes}
			type="button"
			aria-label={text}
			onClick={params => fn(params)}
		>
			{text}
		</button>
	)
}

export default Button
