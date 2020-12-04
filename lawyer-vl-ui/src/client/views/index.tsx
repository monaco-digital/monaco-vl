import React, { FC } from 'react'
import Footer from '../components/Footer'
import LetterPreview from '../components/LetterPreview'
import ParagraphsPreview from '../components/common/ParagraphsPreview'
import Topics from '../components/common/Topics'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import modes from '../state/modes'
import ParagraphsEditMode from '../components/ParagraphsEditMode'

const Main: FC = () => {
	const mode = useSelector<any, any>(state => state.questions.mode)

	return (
		<main className="main">
			<Header />
			{mode === modes.TOPICS && <Topics />}
			{mode === modes.PARAGRAPHS_PREVIEW && <ParagraphsPreview />}
			{mode === modes.PARAGRAPHS_EDIT && <ParagraphsEditMode />}
			{mode === modes.TOPICS && <LetterPreview />}
			<Footer />
		</main>
	)
}

export default Main
