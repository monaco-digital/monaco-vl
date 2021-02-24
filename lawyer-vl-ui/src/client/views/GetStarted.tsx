import React from 'react'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { setPage } from '../../data/navigationDataSlice'
import pages from '../../types/navigation'
import mainimage from '../assets/img/homepage-image-1.png'
export const GetStarted: React.FC = () => {
	const dispatch = useDispatch()

	const goToTopics = () => {
		dispatch(setPage(pages.TOPICS))
	}
	return (
		<div className="get-started">
			<h1>
				Empower yourself
				<br /> with Virtual Lawyer
			</h1>

			<div className="section">
				<div className="lhs-panel">
					<p>
						<b>Discover your rights </b>and build the perfect legal document - either to lodge a formal grievance,
						negotiate an exit package, or bring a claim at an employment tribunal
					</p>

					<h3>Find out whether or not you have a case against your employer</h3>

					<div>
						<Button type="start" text="Get started" rounded fn={() => goToTopics()} />
					</div>
				</div>
				<img style={{ height: '400px' }} src={mainimage} />
			</div>
		</div>
	)
}

export default GetStarted
