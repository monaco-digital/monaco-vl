import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic, Template } from '@monaco-digital/vl-types/lib/main'
import {
	SessionDocumentComponent,
	SessionDocumentSection,
	SessionParagraph,
	SessionDocument,
} from '../../../../types/SessionDocument'
import { PreviewParagraph } from '../DocumentPreviewComponents'
import { createSessionDocument } from '../../../../utils/sessionDocument'
import VLcard from '../VLcard'
import ReactGA from 'react-ga'
import { getTemplate } from '../../../../api/vl'
import { updateSessionDocument, updateSelectedTemplate } from '../../../../data/sessionDataSlice'
import _ from 'lodash'

const DocumentPreview: FC = () => {
	const dispatch = useDispatch()
	const selectedParagraphs = useSelector<AppState, SessionParagraph[]>(state =>
		state.session.suggestedParagraphs.filter(suggested => suggested.isSelected)
	)

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)

	const selectedTemplate = useSelector<AppState, Template>(state => state.session.selectedTemplate)
	const updatedTemplate = getTemplate(selectedTopics)
	if (updatedTemplate.id !== selectedTemplate?.id) {
		dispatch(updateSelectedTemplate(updatedTemplate))
	}

	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocument)
	if (!sessionDocument) {
		const doc = createSessionDocument(updatedTemplate, selectedParagraphs)
		dispatch(updateSessionDocument(doc))
	}

	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: `Letter previewed`,
		})
	}, [])

	const SessionDocComponents: FC<{ sessionDocumentComponents: SessionDocumentComponent[] }> = ({
		sessionDocumentComponents,
	}) => {
		if (!sessionDocumentComponents) return null
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
					<div className="letter-preview__body">
						<SessionDocComponents sessionDocumentComponents={sessionDocument?.sessionDocumentComponents} />
					</div>
				</VLcard>
			</div>
		</>
	)
}

/*
<div className="letter-preview__intro">
						<div className="letter-preview_intro__chevron">
							<button onClick={handleCollapseIntro}>
								<i className={chevronClasses}></i>
							</button>
						</div>
					</div>
<div className="letter-preview__signature">
						<button type="button" onClick={e => getTextTemp()} value="gettext">
							Output text
						</button>
						{/* <LetterPreviewParagraph paragraphs={bottom} /> * /}
						</div> */

export default DocumentPreview
