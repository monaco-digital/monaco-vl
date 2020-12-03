import React from 'react'
import classNames from 'classnames'
import Topic from '../Topic'
import Title from '../Title'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'

const Topics: React.FC = () => {
	const currentQuestion = useSelector<AppState, any>(
		state => state.questions.currentQuestion
	)
	const {
		text,
		questions: { type },
	} = currentQuestion
	const classes = classNames('topics', {
		[`topics__${type}`]: type,
	})

	return (
		<>
			{text && <Title text={text} />}
			<div className={classes}>
				<Topic question={currentQuestion} />
			</div>
		</>
	)
}

export default Topics
