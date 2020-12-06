import React from 'react'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { setPage } from '../../data/navigationDataSlice'

import pages from '../../types/navigation'
export const GetStarted: React.FC = () => {
	const dispatch = useDispatch()

	const goToTopics = () => {
		dispatch(setPage(pages.TOPICS))
	}
	return (
		<>
			<div>TODO - Placeholder - Get Started</div>
			<div>
				<Button type="main" text="Next" rounded fn={() => goToTopics()} />
			</div>
		</>
	)
}

export default GetStarted
