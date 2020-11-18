import React, { useContext } from 'react'
import classNames from 'classnames'
import checkTopicInputStatus from '../../utils/checkTopicInputStatus'
import ScreenContext from '../../context'
import actionType from '../../state/actionType'

const Topic = ({ uiTopic }) => {
	const { state, dispatch } = useContext(ScreenContext)
	const { activeTopics } = state
	const { type } = uiTopic
	const handleOnClickRadio = (options, { label, value }) => {
		dispatch({
			type: actionType.SET_ACTIVE_TOPICS,
			payload: {
				value: { options, topicsValues: { label, value } },
				radio: true,
			},
		})
	}
	const handleOnClickMulti = ({ label, value }) => {
		dispatch({
			type: actionType.SET_ACTIVE_TOPICS,
			payload: { value: { topicsValues: { label, value } } },
		})
	}
	const isRadio = type === 'radio'
	const isMulti = type === 'multi-statement' || type === 'tags'

	return (
		<>
			{isRadio && (
				<Topic.Radio
					uiTopic={uiTopic}
					activeTopics={activeTopics}
					handleOnClick={handleOnClickRadio}
				/>
			)}
			{isMulti && (
				<Topic.Multi
					uiTopic={uiTopic}
					activeTopics={activeTopics}
					handleOnClick={handleOnClickMulti}
					type={type}
				/>
			)}
		</>
	)
}

Topic.Radio = ({ uiTopic: { options, type }, activeTopics, handleOnClick }) => {
	return options.map(({ label, value }, i) => (
		<div key={`value ${i}`} className="topic">
			<input
				type="radio"
				id={label}
				name={type}
				value={value}
				onChange={() => handleOnClick(options, { label, value })}
				checked={checkTopicInputStatus(activeTopics, label)}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	))
}

Topic.Multi = ({ uiTopic: { options }, activeTopics, handleOnClick, type }) => {
	return options.map(({ label, value }, i) => (
		<div key={`value ${i}`} className="topic">
			<input
				type="checkbox"
				id={label}
				name={label}
				value={value}
				onChange={() => handleOnClick({ label, value })}
				checked={checkTopicInputStatus(activeTopics, label)}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	))
}

export default Topic
