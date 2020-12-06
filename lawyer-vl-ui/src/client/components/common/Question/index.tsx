import React from 'react'
import checkTopicInputStatus from '../../../utils/checkTopicInputStatus'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTopic, unselectTopic } from '../../../../data/topicDataSlice'
import { CaseTopic, Question as QuestionT } from '../../../../data/types'
import AppState from '../../../../data/AppState'
import Title from '../../Title'

interface Props {
	question: QuestionT
}
const Question: React.FC<Props> = ({ question }) => {
	const dispatch = useDispatch()
	console.log('QUESTION', question)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)

	const isSingle = question.maxAnswers === 1
	const isMulti = question.maxAnswers > 1

	const answerStyle = isSingle ? 'radio' : 'checkbox'

	const handleOnClick = (id, isRadio = false) => {
		console.log('CLICKED-->->', id)
		if (isSingle) {
			for (const option of question.options) {
				dispatch(unselectTopic(option.topicId))
			}
		}
		dispatch(toggleTopic(id))
	}

	const answers = question.options.map((option, i) => {
		const { text, topicId } = option
		const prerequisites = option.prerequisites || []

		const passesPrerequisites = ''

		return (
			<div key={`value ${i}`} className="topic">
				<input
					type={answerStyle}
					id={topicId}
					name={text}
					value={text}
					onChange={() => handleOnClick(topicId, true)}
					checked={checkTopicInputStatus(selectedTopics, topicId)}
				/>
				<label htmlFor={topicId}>{text}</label>
			</div>
		)
	})

	return (
		<>
			{question.text && <Title text={question} />}

			{answers}
		</>
	)
}

export default Question
