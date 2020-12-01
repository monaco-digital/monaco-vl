import React, { useEffect } from 'react'
import Topics from '../Topics'
import ParagraphsPreview from '../ParagraphsPreview'
import ParagraphsEditMode from '../ParagraphsEditMode'
import LetterPreview from '../LetterPreview'
import modes from '../../state/modes'
import { connect } from 'react-redux'
import { setView } from '../../../../data/questionDataSlice'
import {
	updateAll,
	updateSuggestedParagraphs,
} from '../../../../data/paragraphsDataSlice'
import { getData } from './../../../../api/vlmasersheet'

const Screen = ({
	mode,
	setView,
	selectedTopics,
	updateSuggestedParagraphs,
	updateAll,
}) => {
	useEffect(() => {
		setView()
		;(async () => {
			const paragraphs = await getData()
			updateAll(paragraphs)
		})()
	}, [])

	useEffect(() => {
		updateSuggestedParagraphs()
	}, [selectedTopics])

	return (
		<div className="screen container">
			{mode === modes.TOPICS && <Topics />}
			{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.LETTER_PREVIEW && <LetterPreview />}
		</div>
	)
}
const mapStateToProps = state => {
	const { questions, topics } = state
	return {
		mode: questions.mode,
		selectedTopics: topics.selected,
	}
}

const mapDispatchToProps = {
	setView,
	updateAll,
	updateSuggestedParagraphs,
}
export default connect(mapStateToProps, mapDispatchToProps)(Screen)
