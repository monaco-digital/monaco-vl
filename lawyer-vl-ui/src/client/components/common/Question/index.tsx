import React, { useState } from 'react'
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
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)

	const defaultLimit = 8
	const optionsCount = question.options.length
	const hasMore = optionsCount > defaultLimit

	const [showMore, setShowMore] = useState(false)

	const optionsToShow = showMore
		? question.options
		: question.options.slice(0, defaultLimit)

	const isSingle = question.maxAnswers === 1
	const isMulti = question.maxAnswers > 1

	const answerStyle = isSingle ? 'radio' : 'checkbox'

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
		const prerequisites = option.prerequisites || []
		const passesPrerequisites =
			prerequisites.length === 0 ||
			prerequisites.every(prq => selectedTopicIds.includes(prq))

		if (!passesPrerequisites) return null

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
			<br />
			<br />
			{hasMore && !showMore && (
				<button onClick={e => setShowMore(true)}>show more</button>
			)}
			<br />
			<br />
		</>
	)
}

export default Question
