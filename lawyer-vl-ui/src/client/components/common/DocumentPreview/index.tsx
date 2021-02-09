import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import AppState from '../../../../data/AppState'
import { CaseTopic, DocumentSection, Paragraph } from '@monaco-digital/vl-types/lib/main'
import { SessionDocumentComponent, SessionDocumentSection, SessionParagraph } from '../../../../types/SessionDocument'
import { PreviewParagraph } from '../DocumentPreviewComponents'
import { createSessionDocument, createDocumentFromTemplate } from '../../../../utils/document'
import { getLetterParagraphs, getLetterText } from '../../../../utils/document'
import VLcard from '../VLcard'
import ReactGA from 'react-ga'
import { getTemplate } from '../../../../api/vl'
import { getDocumentText } from '../../../../utils/renderDocument'

const DocumentPreview: FC = () => {
	const selectedParagraphs = useSelector<AppState, SessionParagraph[]>(state =>
		state.session.suggestedParagraphs.filter(suggested => suggested.isSelected)
	)

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.topics.selected)

	const selectedTemplate = getTemplate(selectedTopics)

	const [isCollapsedIntro, setIsCollapsedIntro] = useState(false)
	const chevronClasses = classNames('fas', {
		'fa-chevron-up': isCollapsedIntro,
		'fa-chevron-down': !isCollapsedIntro,
	})
	const handleCollapseIntro = () => {
		setIsCollapsedIntro(collapseIntro => !collapseIntro)
	}

	const sessionDocument = createSessionDocument(selectedTemplate, selectedParagraphs)

	const getTextTemp = () => {
		const tdoc = createDocumentFromTemplate(selectedTemplate, selectedParagraphs)
		console.log(getDocumentText(tdoc))
	}
	// const populatedTemplate = populateTemplate(selectedTemplate, selectedParagraphs)

	const top = null
	const middle = null
	const bottom = null

	ReactGA.event({
		category: 'User',
		action: `Letter previewed`,
	})

	const SessionDocComponents: FC<{ sessionDocumentComponents: SessionDocumentComponent[] }> = ({
		sessionDocumentComponents,
	}) => {
		const output = sessionDocumentComponents.map(sessionDocumentComponent => {
			const type = sessionDocumentComponent && sessionDocumentComponent.type
			switch (type) {
				case 'UserContentSection':
					const userContentSection = sessionDocumentComponent as SessionDocumentSection
					return <SessionDocComponents sessionDocumentComponents={userContentSection.sessionDocumentComponents} />
				case 'TemplateContentSection':
					const templateContentSection = sessionDocumentComponent as SessionDocumentSection
					return <SessionDocComponents sessionDocumentComponents={templateContentSection.sessionDocumentComponents} />
				case 'Paragraph':
					const sessionParagraph = sessionDocumentComponent as SessionParagraph
					return <PreviewParagraph paragraph={sessionParagraph} />
				default:
					return null
			}
		})
		return <>{output.concat()}</>
	}

	return (
		<>
			<div className="letter-preview">
				<VLcard heading="Draft letter" theme="light" counter={selectedParagraphs.length}>
					<div className="letter-preview__intro">
						<div className="letter-preview_intro__chevron">
							<button onClick={handleCollapseIntro}>
								<i className={chevronClasses}></i>
							</button>
						</div>
					</div>
					<div className="letter-preview__body">
						<SessionDocComponents sessionDocumentComponents={sessionDocument.sessionDocumentComponents} />
					</div>
					<div className="letter-preview__signature">
						<button type="button" onClick={e => getTextTemp()} value="gettext">
							Output text
						</button>
						{/* <LetterPreviewParagraph paragraphs={bottom} /> */}
					</div>
				</VLcard>
			</div>
		</>
	)
}

export default DocumentPreview
