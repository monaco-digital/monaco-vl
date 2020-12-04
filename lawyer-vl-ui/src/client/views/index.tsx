import React, { useState } from 'react'
import Footer from '../components/common/Footer'
import KeyFacts from './KeyFacts'
import LetterBuilder from './LetterBuilder'
import PreviewLetter from './preview/PreviewLetter'
import Help from './Help'
import GetStarted from './GetStarted'
import Header from '../components/common/Header'
import Paragraph from '../components/common/Paragraph'

export type NavView =
	| 'get-started'
	| 'key-facts'
	| 'preview-letter'
	| 'letter-builder'
	| 'help'

const Main: React.FC = () => {
	const [activeView, setActiveView] = useState<NavView>('get-started')

	const setView = (view: NavView) => {
		setActiveView(view)
	}

	return (
		<main className="main">
			<Header setView={setView} />
			{activeView === 'get-started' && <GetStarted />}
			{activeView === 'key-facts' && <KeyFacts />}
			{activeView === 'letter-builder' && <LetterBuilder />}
			{activeView === 'preview-letter' && <PreviewLetter />}
			{activeView === 'help' && <Help />}
			<Footer />
		</main>
	)
}

export default Main
