import React from 'react'
import Filters from '../Filters'
import Title from '../Title'

const Screen = () => {
	return (
		<div className="screen container">
			<Title title="Tap all that apply" />
			<Filters />
		</div>
	)
}

export default Screen
