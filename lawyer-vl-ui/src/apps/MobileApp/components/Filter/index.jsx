import React, { useState } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'

const Filter = ({ filterValue }) => {
	const [active, setActive] = useState(false)
	const handleOnClick = setActiveFilters => {
		setActiveFilters(filters => {
			const isAlreadyActive = filters.includes(filterValue)

			if (isAlreadyActive) {
				return filters.filter(value => value !== filterValue)
			} else {
				return [...filters, filterValue]
			}
		})
		setActive(!active)
	}
	return (
		<ScreenContext.Consumer>
			{({ activeFilters, setActiveFilters }) => {
				const classes = classNames('filter__text', {
					'filter__text--active': activeFilters.find(
						value => value === filterValue
					),
				})
				return (
					<button
						type="button"
						aria-label={filterValue}
						className="filter"
						onClick={() => handleOnClick(setActiveFilters)}
					>
						<span className={classes}>{filterValue}</span>
					</button>
				)
			}}
		</ScreenContext.Consumer>
	)
}

export default Filter
