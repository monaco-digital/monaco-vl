import React, { useContext, useEffect } from 'react'
import Title from '../Title'
import Filter from '../Filter'
import ScreenContext from '../../context'

const Filters = () => {
	const { state } = useContext(ScreenContext)
	const { defaultFilters, screen } = state

	return (
		<>
			<Title title="Tap all options that apply." />
			<div className="filters">
				{defaultFilters[screen].map((filterValue, i) => (
					<Filter key={`${filterValue}-${i}`} filterValue={filterValue} />
				))}
			</div>
		</>
	)
}

export default Filters
