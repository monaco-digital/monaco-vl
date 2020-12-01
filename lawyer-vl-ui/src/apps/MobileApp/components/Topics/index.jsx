import React from 'react'
import classNames from 'classnames'
import Topic from '../Topic'
import Title from '../Title'
import { useSelector } from 'react-redux'

const Topics = () => {
	const currentQuestion = useSelector(state => state.questions.currentQuestion)
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
