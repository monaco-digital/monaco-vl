import React, { useContext, useEffect, useState } from 'react'
import Topics from '../Topics'
// import ParagraphsPreview from '../ParagraphsPreview'
// import ParagraphsEditMode from '../ParagraphsEditMode'
// import LetterPreview from '../LetterPreview'
import modes from '../../state/modes'
import { connect } from 'react-redux'
import { setView } from '../../../../data/questionDataSlice'

const Screen = ({ mode, setView }) => {
	useEffect(() => {
		setView()
	}, [])

	return (
		<div className="screen container">
			{mode === modes.TOPICS && <Topics />}
			{/* mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.LETTER_PREVIEW && <LetterPreview />} */}
		</div>
	)
}
const mapStateToProps = state => {
	const { questions } = state
	return {
		mode: questions.mode,
	}
}

const mapDispatchToProps = {
	setView,
}
export default connect(mapStateToProps, mapDispatchToProps)(Screen)
