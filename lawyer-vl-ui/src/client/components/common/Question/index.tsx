import React, { useState } from 'react'
import checkTopicInputStatus from '../../../utils/checkTopicInputStatus'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTopic, unselectTopic } from '../../../../data/topicDataSlice'
import { CaseTopic, Question as QuestionT } from '../../../../data/types'
import AppState from '../../../../data/AppState'
import Title from '../../Title'
import Button from '../../Button'

interface Props {
	question: QuestionT
}
const Question: React.FC<Props> = ({ question }) => {
	const dispatch = useDispatch()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)

	const defaultLimit = 8

	const isSingle = question.maxAnswers === 1
	const isMulti = question.maxAnswers > 1

	const answerStyle = isSingle ? 'radio' : 'checkbox'
	const validOptions = filterValidOptions(question.options, selectedTopicIds)
	const optionsCount = validOptions.length
	const hasMore = optionsCount > defaultLimit
	const [showMore, setShowMore] = useState(false)

	let optionsToShow = validOptions
	if (optionsToShow.length > defaultLimit && !showMore) {
		optionsToShow = optionsToShow.slice(0, defaultLimit)
	}

	const handleOnClick = (id, isRadio = false) => {
		console.log('clicked', id)
		if (isSingle) {
			for (const option of question.options) {
				dispatch(unselectTopic(option.topicId))
			}
		}
		dispatch(toggleTopic(id))
	}

	const answers = optionsToShow.map((option, i) => {
		const { text, topicId } = option
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
			<div className="topics">{answers}</div>
			{hasMore && !showMore && (
				<Button
					type="small"
					text="show more +"
					rounded
					fn={() => setShowMore(true)}
				/>
			)}
			<br />
		</>
	)
}

/* Filters the list of possible options to limit it to only those that pass
the prerequisites */
const filterValidOptions = (options, selectedTopicIds) => {
	const toShow = options.filter(option => {
		const prerequisites = option.prerequisites || []
		const passesPrerequisites =
			prerequisites.length === 0 ||
			prerequisites.every(prq => selectedTopicIds.includes(prq))
		return passesPrerequisites
	})
	return toShow
}

export default Question
