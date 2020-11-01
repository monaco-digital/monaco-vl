import React from 'react'
import Title from '../Title'
import Filter from '../Filter'
import ScreenContext from '../../context'

const Filters = () => {
	return (
		<ScreenContext.Consumer>
			{({ screen, filters }) => (
				<>
					<Title title="Tap all options that apply." />
					<div className="filters">
						{filters[screen].map((filterValue, i) => (
							<Filter key={`${filterValue}-${i}`} filterValue={filterValue} />
						))}
					</div>
				</>
			)}
		</ScreenContext.Consumer>
	)
}

export default Filters
