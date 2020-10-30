import React from 'react'
import Filter from '../Filter'
import ScreenContext from '../../context'

const Filters = () => {
	return (
		<ScreenContext.Consumer>
			{({ screen, filters }) => (
				<div className="filters">
					{console.log(screen)}
					{filters[screen].map(filter => (
						<Filter filter={filter} />
					))}
				</div>
			)}
		</ScreenContext.Consumer>
	)
}

export default Filters
