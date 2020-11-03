import React from 'react'
import classNames from 'classnames'

const Button = ({ type = 'main', text, fn, extraClasses }) => {
	const classes = classNames(
		`${extraClasses} button`,
		{
			'button--main': type === 'main',
		},
		{
			'button--secondary': type === 'secondary',
		},
		{
			'button--neutral': type === 'neutral',
		},
		{
			'button--danger': type === 'danger',
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
