import React, { useContext } from 'react'
import Title from '../Title'
import Filter from '../Filter'
import ScreenContext from '../../context'

const Filters = () => {
	const { screen, filters } = useContext(ScreenContext)

	return (
		<>
			<Title title="Tap all options that apply." />
			<div className="filters">
				{filters[screen].map((filterValue, i) => (
					<Filter key={`${filterValue}-${i}`} filterValue={filterValue} />
				))}
			</div>
		</>
	)
}

export default Filters
