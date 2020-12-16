import React from 'react'
import checkTopicInputStatus from '../../utils/checkTopicInputStatus'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTopic, unselectTopic } from '../../../data/topicDataSlice'
import { CaseTopic } from '../../../data/types'
import AppState from '../../../data/AppState'

interface Props {
	question: any
}
const Topic: React.FC<Props> = ({ question }) => {
	const dispatch = useDispatch()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const { questions } = question
	const type = questions.type
	const isRadio = type === 'radio'
	const isMulti = type === 'multi-statement' || type === 'tags'
	const handleOnClick = (id, isRadio = false) => {
		if (isRadio) {
			for (const option of questions.options) {
				dispatch(unselectTopic(option.id))
			}
		}
		dispatch(toggleTopic(id))
	}

	return (
		<>
			{isRadio && (
				<TopicRadio
					questions={questions}
					handleOnClick={handleOnClick}
					selectedTopics={selectedTopics}
				/>
			)}
			{isMulti && (
				<TopicMulti
					questions={questions}
					handleOnClick={handleOnClick}
					selectedTopics={selectedTopics}
					//TODO - review why type prop is here
					// type={type}
				/>
			)}
		</>
	)
}

interface PropsTopicRadio {
	questions: any
	handleOnClick: (id: string, isRadio: boolean) => void
	selectedTopics: CaseTopic[]
}

const TopicRadio: React.FC<PropsTopicRadio> = ({
	questions: { options },
	handleOnClick,
	selectedTopics,
}) => {
	return options.map((option, i) => {
		const { id, name, questionText } = option

		return (
			<div key={`value ${i}`} className="topic">
				<input
					type="radio"
					id={name}
					name={name}
					value={name}
					onChange={() => handleOnClick(id, true)}
					checked={checkTopicInputStatus(selectedTopics, id)}
				/>
				<label htmlFor={name}>{questionText}</label>
			</div>
		)
	})
}

interface PropsTopicMulti {
	questions: any
	handleOnClick: (id: string, isRadio: boolean) => void
	selectedTopics: CaseTopic[]
}

const TopicMulti = ({
	questions: { options },
	handleOnClick,
	selectedTopics,
}) => {
	return options.map((option, i) => {
		const { id, name, questionText } = option

		return (
			<div key={`value ${i}`} className="topic">
				<input
					type="checkbox"
					id={name}
					name={name}
					value={name}
					onChange={() => handleOnClick(id)}
					checked={checkTopicInputStatus(selectedTopics, id)}
				/>
				<label htmlFor={name}>{questionText}</label>
			</div>
		)
	})
}

export default Topic
