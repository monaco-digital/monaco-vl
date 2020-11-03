import React, { useContext } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'

const Filter = ({ filterValue }) => {
	const { activeFilters, setActiveFilters } = useContext(ScreenContext)
	const handleOnClick = () => {
		setActiveFilters(filters => {
			const isAlreadyActive = filters.includes(filterValue)

			if (isAlreadyActive) {
				return filters.filter(value => value !== filterValue)
			} else {
				return [...filters, filterValue]
			}
		})
	}
	const classes = classNames('filter__text', {
		'filter__text--active': activeFilters.find(value => value === filterValue),
	})
	return (
		<button
			type="button"
			aria-label={filterValue}
			className="filter"
			onClick={() => handleOnClick()}
		>
			<span className={classes}>{filterValue}</span>
		</button>
	)
}

export default Filter
