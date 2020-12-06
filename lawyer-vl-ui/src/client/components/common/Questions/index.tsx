import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import AppState from '../../../../data/AppState'
import { updateSuggestedParagraphs } from '../../../../data/paragraphsDataSlice'
import { CaseTopic, Question as QuestionT } from '../../../../data/types'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import Question from '../Question'
import _ from 'lodash'
import Button from '../../Button'
import { addAnsweredQuestion } from '../../../../data/questionDataSlice'
import { setPage } from '../../../../data/navigationDataSlice'

const Questions: FC = () => {
	let selectedTopics =
		useSelector<AppState, CaseTopic[]>(state => state.topics.selected) || []

	let answeredQuestions =
		useSelector<AppState, QuestionT[]>(
			state => state.questions.answeredQuestions
		) || []

	console.log('Render question answered questions', answeredQuestions.length)

	// const currentQuestion = useSelector<AppState, QuestionT>(
	// 	state => state.questions.currentQuestion
	// ) || {} as QuestionT

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)

	const dispatch = useDispatch()

	if (!currentQuestion) {
		console.log('No more questions')
		dispatch(setPage('PARAGRAPHS_PREVIEW'))
		return null
	}

	const text = currentQuestion.text || ''
	const subtext = currentQuestion.subtext || ''
	const isMulti = currentQuestion.maxAnswers > 1
	const type = isMulti ? 'tags' : ''

	const classes = classNames('topics', {
		[`topics__${type}`]: type,
	})

	const handleGoBackwards = () => {}

	const handleGoForward = () => {
		console.log('Handle go forward')
		dispatch(addAnsweredQuestion(currentQuestion))
	}

	return (
		<>
			<div className={classes}>
				<Question question={currentQuestion} />
				<div className="topics__actions">
					<Button
						type="green"
						text="Next"
						rounded
						fn={() => handleGoForward()}
						extraClasses="topics__actions-next"
					/>
				</div>
			</div>
		</>
	)
}

export default Questions
