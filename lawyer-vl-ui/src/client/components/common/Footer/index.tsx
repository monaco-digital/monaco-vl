import React, { useState } from 'react'
import Button from '../../Button'
import moreInfoIcon from './../../../assets/img/more-info-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import {
	CaseTopic,
	Paragraph,
	Question as QuestionT,
} from '../../../../data/types'
import pages from '../../../../types/navigation'
import { setPage } from '../../../../data/navigationDataSlice'
import { getLetterText } from '../../../../utlis/letter'
import { callGoogleApi } from '../../../../api/google'
import useViewport from '../../../utils/useViewport'
import summaryIconWhite from '../../../assets/img/summaries-icon-white.svg'
import paragraphIconWhite from '../../../assets/img/expand-text-icon-white.svg'
import summaryIconBlack from '../../../assets/img/summaries-icon-black.svg'
import paragraphIconBlack from '../../../assets/img/expand-text-icon-black.svg'
import { ParagraphToggle } from '../../../../types/paragraph'
import { setParagraphToggle } from '../../../../data/paragraphsDataSlice'
import vlToastTrigger from '../../../../utlis/vlToastTrigger'
import { removeLastAnsweredQuestion } from '../../../../data/questionDataSlice'
import { getNextQuestion } from '../../../../clustering/questionFlow'

const Footer: React.FC = () => {
	const page = useSelector<AppState, string>(state => state.navigation.page)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)
	const answeredQuestions = useSelector<AppState, QuestionT[]>(
		state => state.questions.answeredQuestions
	)

	const { isDesktop } = useViewport()

	const dispatch = useDispatch()

	const [paragraphToggle, setParaToggle] = useState<ParagraphToggle>('summary')

	// const handleGoForward = () => {
	// 	dispatch(setView(selectedTopics))
	// }

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
		console.log('Navigating to: ', page)
		dispatch(setPage(page))
	}

	// const enterParagraphPreviewMode = () => {
	// 	dispatch(setMode(modes.PARAGRAPHS_PREVIEW))
	// }

	const copyParasToText = () => {
		try {
			navigator.clipboard.writeText(
				getLetterText(selectedTopics, selectedParagraphs)
			)
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
			const shareableLink = await callGoogleApi(
				getLetterText(selectedTopics, selectedParagraphs)
			)
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
		dispatch(setParagraphToggle(toggle))
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
					<>
						<button
							className="footer__actions-info"
							aria-label="More info"
							type="button"
							onClick={() => navigateTo(pages.HELP)}
						>
							<img src={moreInfoIcon} />
						</button>
					</>
				)}
				{page === pages.PARAGRAPHS_EDIT && !isDesktop && (
					<>
						<Button
							type="secondary"
							text="Done"
							rounded
							fn={() => navigateTo(pages.PARAGRAPHS_PREVIEW)}
						/>
					</>
				)}
				{page === pages.PARAGRAPHS_PREVIEW && !isDesktop && (
					<>
						<Button
							type="secondary"
							text="Reorder"
							rounded
							fn={() => navigateTo(pages.PARAGRAPHS_EDIT)}
						/>
						<Button
							type="green"
							text="Next"
							rounded
							fn={() => navigateTo(pages.LETTER_PREVIEW)}
						/>
					</>
				)}
				{page === pages.PARAGRAPHS_PREVIEW && isDesktop && (
					<>
						<div className="footer__actions__switch__buttons space-x-4">
							<button
								className="footer__actions-info"
								aria-label="More info"
								type="button"
								onClick={handleMoreInfo}
							>
								<img src={moreInfoIcon} />
							</button>
							<div>
								<button
									className={
										paragraphToggle === 'summary'
											? 'footer__actions__switch__button__selected -mr-8'
											: 'footer__actions__switch__button__notselected -mr-8'
									}
									aria-label="Summaries"
									type="button"
									onClick={() => toggleParagraphView('summary')}
								>
									<img
										src={
											paragraphToggle === 'summary'
												? summaryIconWhite
												: summaryIconBlack
										}
									/>{' '}
									Summaries
								</button>
								<button
									className={
										paragraphToggle === 'paragraph'
											? 'footer__actions__switch__button__selected'
											: 'footer__actions__switch__button__notselected'
									}
									aria-label="Paragraphs"
									type="button"
									onClick={() => toggleParagraphView('paragraph')}
								>
									<img
										src={
											paragraphToggle === 'paragraph'
												? paragraphIconWhite
												: paragraphIconBlack
										}
									/>{' '}
									Paragraphs
								</button>
							</div>
						</div>
						<div className="self-end">
							<div className="">
								<Button
									type="main"
									text="Preview Letter"
									rounded
									fn={() => enterLetterPreviewMode()}
								/>
							</div>
						</div>
					</>
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
							fn={() => navigateTo(pages.TOPICS)}
						/>
					</div>
				)}
				{page === pages.LETTER_PREVIEW && (
					<>
						<button
							className="footer__actions-info"
							aria-label="More info"
							type="button"
							onClick={handleMoreInfo}
						>
							<img src={moreInfoIcon} />
						</button>
						<div className="footer__preview__button">
							<Button
								type="secondary"
								shortText="Copy text"
								text="Copy letter text"
								rounded
								fn={copyParasToText}
							/>
							<Button
								type="main"
								shortText="Google doc"
								text="Create Google Doc"
								rounded
								fn={openInGoogleDoc}
							/>
						</div>
					</>
				)}
			</div>
		</footer>
	)
}
export default Footer
