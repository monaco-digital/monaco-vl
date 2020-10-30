import React, { useState } from 'react'
import classNames from 'classnames'

const Filter = ({ filter }) => {
	const [active, setActive] = useState(false)
	const classes = classNames('filter__text', { 'filter__text--active': active })
	const handleOnClick = () => {
		setActive(!active)
	}
	return (
		<button
			type="button"
			aria-label={filter}
			className="filter"
			onClick={handleOnClick}
		>
			<span className={classes}>{filter}</span>
		</button>
	)
}

export default Filter
