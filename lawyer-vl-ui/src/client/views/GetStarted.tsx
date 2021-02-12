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
		<div className="get-started">
			<h1>Welcome to Virtual Lawyer</h1>
			<p>
				<i>Empowering Employees</i>{' '}
			</p>
			<br />
			<p>
				With just a few clicks you can build the perfect legal letter to send to your employer to negotiate
				<br /> a fair settlement agreement exit package after being badly treated at work.
			</p>
			<br />
			<p>
				<b>You can do this in 3 easy steps:</b>
			</p>
			<p className="get-started__step">
				<div className={'circle__icon'}>1</div>
				<p>
					Tell us a few <b>key facts</b> about your case.
				</p>
			</p>
			<p className="get-started__step">
				<div className={'circle__icon'}>2</div>{' '}
				<p>
					Select the paragraphs that apply to you to <b>build your letter</b>.
				</p>
			</p>
			<p className="get-started__step">
				<div className={'circle__icon'}>3</div>
				<p>
					<b>Preview your letter</b> and create a draft to take away.
				</p>
			</p>
			<br />
			<div>
				<Button type="main" text="Next" rounded fn={() => goToTopics()} />
			</div>
		</div>
	)
}

export default GetStarted
