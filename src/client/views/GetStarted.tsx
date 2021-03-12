import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../components/Button'
import mainimage from '../assets/img/homepage-image-1.png'

export const GetStarted: React.FC = () => {
	const history = useHistory()

	const goToTopics = () => {
		history.push('/questions')
	}

	return (
		<div className="get-started space-y-3 w-full">
			<div>
				<h1>Empowering employees</h1>
			</div>
			<div>
				<h3>Get free advice and build legal letters when badly treated at work</h3>
			</div>
			<div className="get-started__content">
				<img style={{ height: '300px' }} src={mainimage} />
			</div>
			<div className="flex justify-center">
				<Button type="start" text="Get started" rounded fn={goToTopics} />
			</div>
		</div>
	)
}

export default GetStarted
