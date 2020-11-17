import React, { useContext } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'

const Filter = ({ filterValue }) => {
	const { state, dispatch } = useContext(ScreenContext)
	const { activeFilters } = state

	const handleOnClick = () => {
		dispatch({ type: 'SET_ACTIVE_FILTERS', payload: { value: filterValue } })
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
