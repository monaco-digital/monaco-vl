import React from 'react'
import Button from '../components/common/Button'
import { useDispatch } from 'react-redux'
import modes from '../state/modes'
import { setMode } from '../../data/navigationDataSlice'
export const GetStarted: React.FC = () => {
	const dispatch = useDispatch()

	const goToTopics = () => {
		dispatch(setMode(modes.TOPICS))
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
