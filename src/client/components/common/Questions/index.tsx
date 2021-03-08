import React, { FC } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AppState from '../../../../data/AppState'
import { Question as QuestionT } from '../../../../types/Questions'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import Question from '../Question'
import _ from 'lodash'
import Button from '../../Button'
import { addAnsweredQuestion } from '../../../../data/sessionDataSlice'

const Questions: FC = () => {
	const history = useHistory()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)

	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions)

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)
	const dispatch = useDispatch()

	if (!currentQuestion) {
		history.push('/statements')
		return null
	}

	const optionsSelectedCount = currentQuestion.options.reduce(
		(acc, curr) => (selectedTopicIds.includes(curr.topicId) ? acc + 1 : acc),
		0
	)
	const enableNext = optionsSelectedCount >= currentQuestion.minAnswers

	const isMulti = currentQuestion.maxAnswers > 1
	const type = isMulti ? 'tags' : ''

	const classes = classNames('questions', {
		[`questions__${type}`]: type,
	})

	const handleGoForward = () => {
		dispatch(addAnsweredQuestion(currentQuestion))
	}

	return (
		<>
			<div className={classes}>
				{currentQuestion.id <= 6 && <div className="questions__steps">Step 1 of 2: Your Job Situation</div>}
				{currentQuestion.id > 6 && <div className="questions__steps">Step 2 of 2: Reasons Given</div>}
				<Question question={currentQuestion} />
				<div className="topics__actions">
					<Button
						disabled={!enableNext}
						type={!enableNext ? 'tertiary' : 'green'}
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
