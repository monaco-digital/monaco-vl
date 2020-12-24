import React, { useEffect, useState } from 'react'
import Button from '../../Button'
import checkTopicInputStatus from '../../../utils/checkTopicInputStatus'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { AuthorPerspective, CaseTopic } from '../../../../data/types'
import { toggleTopic, unselectTopic } from '../../../../data/topicDataSlice'
import { setAuthorPerspective } from '../../../../data/filterDataSlice'

import { SelectFilter } from './SelectFilter'

const TopicFilter: React.FC = () => {
	const classes = classNames('topicfilter', 'topicfilter__tags')

	const dispatch = useDispatch()

	const topics = useSelector<AppState, CaseTopic[]>(state => state.topics.all)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const authorPerspective = useSelector<AppState, AuthorPerspective>(
		state => state.filters.authorPerspective
	)

	const [showDiscrimination, setShowDiscrimination] = useState(false)

	const [perspectiveFilter, setPerspectiveFilter] = useState(
		authorPerspective?.perspective
	)
	const [authorFilter, setAuthorFilter] = useState(authorPerspective?.author)

	const onPerspectiveChange = (value: any) => {
		setPerspectiveFilter(value !== 'No Filter' ? value : undefined)
	}

	const onAuthorChange = (value: any) => {
		setAuthorFilter(value !== 'No Filter' ? value : undefined)
	}

	useEffect(() => {
		dispatch(
			setAuthorPerspective({
				perspective: perspectiveFilter,
				author: authorFilter,
			})
		)
	}, [perspectiveFilter, authorFilter])

	useEffect(() => {
		if (selectedTopics.some(topic => topic.id === 'D')) {
			setShowDiscrimination(true)
		} else {
			setShowDiscrimination(false)
		}
	}, [selectedTopics])

	const topicsCopy = [...topics]
	const indexDiscrimination = topicsCopy.findIndex(
		topic => topic.type === 'case' && topic.id === 'D'
	)
	topicsCopy.push(topicsCopy.splice(indexDiscrimination, 1)[0])

	const handleOnClick = id => {
		console.log('the toggle id  is: ', id)
		dispatch(toggleTopic(id))
	}

	const topicCaseViews = topicsCopy
		?.filter(topic => topic?.type === 'case')
		.map((topic, i) => {
			const { id } = topic
			return (
				<div
					key={`value ${i}`}
					className="topic"
					onClick={() => handleOnClick(id)}
				>
					<input
						type={'checkbox'}
						id={topic.id}
						name={topic.name}
						value={topic.text}
						checked={checkTopicInputStatus(selectedTopics, id)}
					/>
					<label htmlFor={topic.text}>{topic.text}</label>
				</div>
			)
		})

	const topicDiscriminationSubCaseViews = topics
		.filter(
			topic => topic.type === 'subcase' && topic.parentTopics.includes('D')
		)
		.map((topic, i) => {
			const { id } = topic
			return (
				<div
					key={`value ${i}`}
					className="topic"
					onClick={() => handleOnClick(id)}
				>
					<input
						type={'checkbox'}
						id={topic.id}
						name={topic.name}
						value={topic.text}
						checked={checkTopicInputStatus(selectedTopics, id)}
					/>
					<label htmlFor={topic.text}>{topic.text}</label>
				</div>
			)
		})

	return (
		<>
			<div className={classes}>
				<div className="grid grid-cols-4 gap-1">
					<div
						onClick={() => handleOnClick('E')}
						key={`value ${1000}`}
						className="topic"
					>
						<input
							type={'checkbox'}
							id="E"
							name="EMPLO|YED"
							value="Employed"
							checked={checkTopicInputStatus(selectedTopics, 'E')}
						/>
						<label htmlFor="Employed">Employed</label>
					</div>
					{topicCaseViews}
				</div>
				{showDiscrimination && (
					<div className="grid grid-cols-4 gap-1 mt-8">
						{topicDiscriminationSubCaseViews}
					</div>
				)}
			</div>
			<div className="inline-flex">
				<div className="w-full z-10">
					<SelectFilter
						filterValues={['No Filter', 'First', 'Third']}
						label={'Paragraph Perspective'}
						chosenValue={perspectiveFilter}
						onSelect={onPerspectiveChange}
					/>
				</div>
				<div className="w-full z-10">
					<SelectFilter
						filterValues={['No Filter', 'AV', 'RP']}
						label={'Choose Author'}
						chosenValue={authorFilter}
						onSelect={onAuthorChange}
					/>
				</div>
			</div>
		</>
	)
}

export default TopicFilter
