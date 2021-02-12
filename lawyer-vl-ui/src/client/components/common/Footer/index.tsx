import React, { useState } from 'react'
import Button from '../../Button'
import moreInfoIcon from './../../../assets/img/more-info-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { Question as QuestionT } from '../../../../data/types'
import { SessionParagraph } from '../../../../types/SessionDocument'
import pages from '../../../../types/navigation'
import { setPage } from '../../../../data/navigationDataSlice'
import { getLetterText } from '../../../../utils/document'
import { callGoogleApi } from '../../../../api/google'
import useViewport from '../../../utils/useViewport'
import summaryIconWhite from '../../../assets/img/summaries-icon-white.svg'
import paragraphIconWhite from '../../../assets/img/expand-text-icon-white.svg'
import summaryIconBlack from '../../../assets/img/summaries-icon-black.svg'
import paragraphIconBlack from '../../../assets/img/expand-text-icon-black.svg'
import { ParagraphToggle } from '../../../../types/paragraph'
import vlToastTrigger from '../../../../utils/vlToastTrigger'
import { removeLastAnsweredQuestion, updateSelectedTopics } from '../../../../data/sessionDataSlice'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import ReactGA from 'react-ga'

const Footer: React.FC = () => {
	const page = useSelector<AppState, string>(state => state.navigation.page)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const suggestedParagraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs)
	const selectedParagraphs = suggestedParagraphs.filter(sp => sp.isSelected)
	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions)

	const { isDesktop } = useViewport()

	const dispatch = useDispatch()

	const [paragraphToggle, setParaToggle] = useState<ParagraphToggle>('summary')

	const enterLetterPreviewMode = () => {
		dispatch(setPage(pages.LETTER_PREVIEW))
	}

	const handleMoreInfo = () => {
		dispatch(setPage(pages.HELP))
	}

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)

	const navigateTo = page => {
		if (page === pages.TOPICS && !currentQuestion) {
			dispatch(removeLastAnsweredQuestion(null))
		}
		dispatch(setPage(page))
	}

	const handleGoBackwards = () => {
		console.log('Handle go backwards')
		const optionsToDeselect = currentQuestion.options.map(option => option.topicId)
		const updatedSelectedTopics = selectedTopics.filter(topic => !optionsToDeselect.includes(topic.id))
		dispatch(updateSelectedTopics(updatedSelectedTopics))
		dispatch(removeLastAnsweredQuestion(null))
	}

	const copyParasToText = () => {
		try {
			ReactGA.event({
				category: 'User',
				action: 'Copied text',
			})
			navigator.clipboard.writeText(getLetterText(selectedTopics, selectedParagraphs))
			vlToastTrigger({
				text: 'Text copied',
				type: 'info',
				iconType: 'copy',
			})
		} catch (error) {
			vlToastTrigger({
				text: 'Unable to create Google Doc',
				type: 'warning',
				iconType: 'warning',
			})
		}
	}

	const openInGoogleDoc = async () => {
		try {
			vlToastTrigger({
				text: 'Creating document...',
				iconType: 'new-doc',
			})
			ReactGA.event({
				category: 'User',
				action: 'Created a Google Doc',
			})
			const shareableLink = await callGoogleApi(getLetterText(selectedTopics, selectedParagraphs))
			window.open(shareableLink, '_blank')
		} catch (error) {
			vlToastTrigger({
				text: 'Unable to create Google Doc',
				type: 'warning',
				iconType: 'warning',
			})
		}
	}

	const toggleParagraphView = (toggle: ParagraphToggle) => {
		setParaToggle(toggle)
		// dispatch(setParagraphToggle(toggle))
	}

	// const enterParagraphEditMode = () => {
	// 	dispatch(setMode(modes.PARAGRAPHS_EDIT))
	// }

	//const downloadLetter = async () => {
	// TODO find out how this is going to be implemented, if any.
	// const docBlob = await createLetterDocx(selectedParagraphs)
	// saveAs(docBlob, 'Your letter.docx')
	//}

	return (
		<footer className="footer">
			<div className="footer__actions">
				{page === pages.GET_STARTED && <></>}
				{page === pages.TOPICS && (
					<div className="footer__actions__switch__buttons space-x-4">
						<button
							className="footer__actions-info"
							aria-label="More info"
							type="button"
							onClick={() => navigateTo(pages.HELP)}
						>
							<img src={moreInfoIcon} />
						</button>
						<Button
							type="secondary"
							text="Back"
							rounded
							extraClasses={'footer__actions-back-button'}
							fn={() => handleGoBackwards()}
						/>
					</div>
				)}
				{page === pages.STATEMENT_SELECT && (
					<div className="footer__actions__switch__buttons space-x-4">
						<button
							className="footer__actions-info"
							aria-label="More info"
							type="button"
							onClick={() => navigateTo(pages.HELP)}
						>
							<img src={moreInfoIcon} />
						</button>
						<Button
							type="secondary"
							text="Back"
							rounded
							extraClasses={'footer__actions-back-button'}
							fn={() => navigateTo(pages.TOPICS)}
						/>
					</div>
				)}
				{page === pages.LETTER_PREVIEW && (
					<>
						<div className="footer__actions__switch__buttons space-x-1 md:space-x-4">
							<button
								className="footer__actions-info"
								aria-label="More info"
								type="button"
								onClick={() => navigateTo(pages.HELP)}
							>
								<img src={moreInfoIcon} />
							</button>
							<Button
								type="secondary"
								text="Back"
								rounded
								extraClasses={'footer__actions-back-button'}
								fn={() => navigateTo(pages.STATEMENT_SELECT)}
							/>
						</div>
						<div className="footer__preview__button">
							<Button type="secondary" shortText="Copy" text="Copy letter text" rounded fn={copyParasToText} />
							<Button type="main" shortText="Open Doc" text="Create Google Doc" rounded fn={openInGoogleDoc} />
						</div>
					</>
				)}
				{page === pages.HELP && (
					<div className="footer__actions__switch__buttons space-x-4">
						<Button
							type="secondary"
							text="Back"
							rounded
							extraClasses={'footer__actions-back-button'}
							fn={() => navigateTo(pages.TOPICS)}
						/>
					</div>
				)}
			</div>
		</footer>
	)
}
export default Footer
