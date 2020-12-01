import React from 'react'
import checkTopicInputStatus from '../../utils/checkTopicInputStatus'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTopic, unselectTopic } from '../../../../data/topicDataSlice'

const Topic = ({ question }) => {
	const dispatch = useDispatch()
	const selectedTopics = useSelector(state => state.topics.selected)
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
				<Topic.Radio
					questions={questions}
					handleOnClick={handleOnClick}
					selectedTopics={selectedTopics}
				/>
			)}
			{isMulti && (
				<Topic.Multi
					questions={questions}
					handleOnClick={handleOnClick}
					selectedTopics={selectedTopics}
					type={type}
				/>
			)}
		</>
	)
}

Topic.Radio = ({ questions: { options }, handleOnClick, selectedTopics }) => {
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

Topic.Multi = ({ questions: { options }, handleOnClick, selectedTopics }) => {
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
