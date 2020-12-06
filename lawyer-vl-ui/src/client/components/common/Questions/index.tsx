import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic, Question as QuestionT } from '../../../../data/types'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import Question from '../Question'
import _ from 'lodash'
import Button from '../../Button'
import {
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
} from '../../../../data/questionDataSlice'
import { setPage } from '../../../../data/navigationDataSlice'
import { unselectTopic } from '../../../../data/topicDataSlice'

import { current } from '@reduxjs/toolkit'

const Questions: FC = () => {
	let selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)

	let answeredQuestions = useSelector<AppState, QuestionT[]>(
		state => state.questions.answeredQuestions
	)

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)
	const dispatch = useDispatch()

	if (!currentQuestion) {
		console.log('No more questions')
		dispatch(setPage('PARAGRAPHS_PREVIEW'))
		return null
	}

	const optionsSelectedCount = currentQuestion.options.reduce(
		(acc, curr) => (selectedTopicIds.includes(curr.topicId) ? acc + 1 : acc),
		0
	)
	const enableNext = optionsSelectedCount >= currentQuestion.minAnswers

	const text = currentQuestion.text || ''
	const subtext = currentQuestion.subtext || ''
	const isMulti = currentQuestion.maxAnswers > 1
	const type = isMulti ? 'tags' : ''

	const classes = classNames('topics', {
		[`topics__${type}`]: type,
	})

	const handleGoBackwards = () => {
		console.log('Handle go backwards')
		for (const option of currentQuestion.options) {
			dispatch(unselectTopic(option.topicId))
		}
		dispatch(removeLastAnsweredQuestion(null))
	}

	const handleGoForward = () => {
		console.log('Handle go forward')
		dispatch(addAnsweredQuestion(currentQuestion))
	}

	return (
		<>
			<div className={classes}>
				<Question question={currentQuestion} />
				<div className="topics__actions">
					{answeredQuestions.length > 0 && (
						<Button
							type="green"
							text="Back"
							rounded
							fn={() => handleGoBackwards()}
							extraClasses="topics__actions-next"
						/>
					)}
					{enableNext && (
						<Button
							type="green"
							text="Next"
							rounded
							fn={() => handleGoForward()}
							extraClasses="topics__actions-next"
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default Questions
