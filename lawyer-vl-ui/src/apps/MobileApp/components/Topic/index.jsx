import React from 'react'
import checkTopicInputStatus from '../../utils/checkTopicInputStatus'
import { connect } from 'react-redux'
import { setTopicsRadio, setTopicsMulti } from '../../../../data/topicDataSlice'

const Topic = ({
	question,
	selectedTopics,
	setTopicsRadio,
	setTopicsMulti,
}) => {
	const { questions } = question
	const type = questions.type
	const handleOnClickRadio = (options, id) => {
		setTopicsRadio({ options, id })
	}
	const handleOnClickMulti = id => {
		setTopicsMulti({ id })
	}
	const isRadio = type === 'radio'
	const isMulti = type === 'multi-statement' || type === 'tags'

	return (
		<>
			{isRadio && (
				<Topic.Radio
					questions={questions}
					selectedTopics={selectedTopics}
					handleOnClick={handleOnClickRadio}
				/>
			)}
			{isMulti && (
				<Topic.Multi
					questions={questions}
					handleOnClick={handleOnClickMulti}
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
					onChange={() => handleOnClick(options, id)}
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

const mapStateToProps = state => {
	const { topics } = state
	return {
		selectedTopics: topics.selected,
	}
}

const mapDispatchToProps = {
	setTopicsRadio,
	setTopicsMulti,
}
export default connect(mapStateToProps, mapDispatchToProps)(Topic)
