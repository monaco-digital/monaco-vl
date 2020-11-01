import React from 'react'
import Filter from '../Filter'
import ScreenContext from '../../context'

const Filters = () => {
	return (
		<ScreenContext.Consumer>
			{({ screen, filters }) => (
				<div className="filters">
					{filters[screen].map((filterValue, i) => (
						<Filter key={`${filterValue}-${i}`} filterValue={filterValue} />
					))}
				</div>
			)}
		</ScreenContext.Consumer>
	)
}

export default Filters
