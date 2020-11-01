import React from 'react'
import classNames from 'classnames'

const Button = ({ type = 'main', text, fn }) => {
	const classes = classNames(
		'button',
		{
			'button--main': type === 'main',
		},
		{
			'button--secondary': type === 'secondary',
		},
		{
			'button--neutral': type === 'neutral',
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
