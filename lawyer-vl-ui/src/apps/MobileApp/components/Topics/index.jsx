import React from 'react'
import classNames from 'classnames'
import Topic from '../Topic'
import Title from '../Title'
import { connect } from 'react-redux'

const Topics = ({ currentQuestion }) => {
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

const mapStateToProps = state => {
	const { questions } = state
	return {
		currentQuestion: questions.currentQuestion,
	}
}

export default connect(mapStateToProps)(Topics)
