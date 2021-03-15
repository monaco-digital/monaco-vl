import React, { useState } from 'react'
import checkTopicInputStatus from '../../../utils/checkTopicInputStatus'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedTopics } from '../../../../data/sessionDataSlice'
import { Question as QuestionT } from '../../../../types/Questions'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import AppState from '../../../../data/AppState'
import Title from '../../Title'
import Button from '../../Button'
import classNames from 'classnames'
import ReactGA from 'react-ga'

interface Props {
	question: QuestionT
}
const Question: React.FC<Props> = ({ question }: Props) => {
	const dispatch = useDispatch()

	const isMonetizationEnabled = useSelector<AppState, boolean>(state => state.features.enableMonetization)
	const allTopics = useSelector<AppState, CaseTopic[]>(state => state.topics.all)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)

	const defaultLimit = 14

	const isSingle = question.maxAnswers === 1

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
		const option = validOptions.find(option => option.topicId === id)

		ReactGA.event({
			category: 'User',
			action: `Clicked topic: ${option.text}`,
		})
		const updatedSelectedTopics = recalculateSelectedTopics(id, allTopics, selectedTopics, question, isSingle)

		dispatch(updateSelectedTopics(updatedSelectedTopics))
	}

	const answers = optionsToShow.map((option, i) => {
		const { id: questionId } = question
		let { text } = option
		const { topicId } = option

		if (isMonetizationEnabled && questionId === 1) {
			if (topicId === '_LET') {
				text = text + ' - £5'
			} else {
				text = text + ' - £FREE'
			}
		}

		return (
			<div key={`value ${i}`} className="topic inline-flex">
				<input
					type={answerStyle}
					id={topicId}
					name={text}
					value={text}
					onChange={() => handleOnClick(topicId, true)}
					checked={checkTopicInputStatus(selectedTopics, topicId)}
				/>
				<label htmlFor={topicId}>
					<div className="inline-flex items-center content-center">
						{text}
						{topicId === '_PC' && (
							<div className="questions__tags__topic-chevron ml-4">
								<div
									className={
										checkTopicInputStatus(selectedTopics, topicId)
											? classNames('fas', 'fa-chevron-up')
											: classNames('fas', 'fa-chevron-down')
									}
								/>
							</div>
						)}
					</div>
				</label>
			</div>
		)
	})

	return (
		<>
			<div className="questions__title">{question.text && <Title text={question} />}</div>
			<div className="topics">{answers}</div>
			{hasMore && !showMore && <Button type="small" text="show more +" rounded fn={() => setShowMore(true)} />}
			<br />
		</>
	)
}

/* Filters the list of possible options to limit it to only those that pass
the prerequisites */
const filterValidOptions = (options, selectedTopicIds) => {
	const toShow = options.filter(option => {
		const prerequisites = option.prerequisites || []
		return passesPrerequisites(prerequisites, selectedTopicIds)
	})
	return toShow
}

const passesPrerequisites = (prerequisites, selectedTopicIds) => {
	if (prerequisites.length === 0) return true
	return prerequisites.every(prerequisite => {
		// Allow 'negative' prerequisites
		if (/^!/.test(prerequisite)) {
			return !selectedTopicIds.includes(prerequisite.replace(/^!/, ''))
		} else {
			return selectedTopicIds.includes(prerequisite)
		}
	})
}

const recalculateSelectedTopics = (
	id: string,
	allTopics: CaseTopic[],
	selectedTopics: CaseTopic[],
	question: QuestionT,
	isSingle: boolean
): CaseTopic[] => {
	const toDeselect = []

	// find topic
	const topic = allTopics.find(topic => topic.id === id)

	// Check if it is already selected
	const isSelected = selectedTopics.find(topic => topic.id === id)
	if (isSelected) {
		toDeselect.push(id)
	}

	if (isSingle) {
		// if single, deselect all other options from the question
		const optionIds = question.options.map(option => option.topicId)
		toDeselect.push(...optionIds)
	}

	// Deselect all unwanted
	const newSelectedTopics = selectedTopics.filter(topic => !toDeselect.includes(topic.id))

	if (!isSelected) {
		newSelectedTopics.push(topic)
	}
	return newSelectedTopics
}

export default Question
