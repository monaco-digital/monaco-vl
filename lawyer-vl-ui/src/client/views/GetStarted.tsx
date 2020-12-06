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
			<h1>Welcome to Virtual Lawyer</h1>
			<p>
				<i>Negotiate your exit like a pro</i>{' '}
			</p>
			<br />
			<p>
				With just a few clicks you can build the perfect legal letter to send to
				your employer to negotiate
				<br /> a fair settlement agreement exit package after being badly
				treated at work.
			</p>
			<p>
				<b>You can do this in 3 easy steps:</b>
			</p>
			<p>
				<i>1</i> Tell us a few<b>&nbsp;key facts&nbsp;</b> about your case.
			</p>
			<p>
				<i>2</i> Select the paragraphs that apply to you to{' '}
				<b>&nbsp;build your letter&nbsp;</b>.
			</p>
			<p>
				<i>3</i> <b>&nbsp;Preview your letter&nbsp;</b> and create a draft to
				take away.
			</p>
			<div>
				<Button type="main" text="Next" rounded fn={() => goToTopics()} />
			</div>
		</>
	)
}

export default GetStarted
