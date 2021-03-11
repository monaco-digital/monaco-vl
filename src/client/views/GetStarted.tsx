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
		<div className="get-started">
			<h1>Empowering employees</h1>
			<h3>Get free advice and build legal letters when badly treated at work</h3>
			<img style={{ height: '300px' }} src={mainimage} />
			<Button type="start" text="Get started" rounded fn={goToTopics} />
		</div>
	)
}

export default GetStarted
