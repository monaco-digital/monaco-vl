import React from 'react'
import Button from '../../Button'
import moreInfoIcon from './../../../assets/img/more-info-icon.svg'
import dragIcon from './../../../assets/img/drag-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic, Paragraph } from '../../../../data/types'
import pages from '../../../../types/navigation'
import { setPage } from '../../../../data/navigationDataSlice'
import { getLetterText } from '../../../../utlis/letter'
import { callGoogleApi } from '../../../../api/google'
import useViewport from '../../../utils/useViewport'

const Footer: React.FC = () => {
	const page = useSelector<AppState, string>(state => state.navigation.page)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)
	const { isMobile } = useViewport()

	const dispatch = useDispatch()

	// const handleGoForward = () => {
	// 	dispatch(setView(selectedTopics))
	// }

	const enterLetterPreviewMode = () => {
		dispatch(setPage(pages.LETTER_PREVIEW))
	}

	const handleMoreInfo = () => {
		dispatch(setPage(pages.HELP))
	}

	const navigateTo = page => {
		dispatch(setPage(page))
	}

	// const enterParagraphPreviewMode = () => {
	// 	dispatch(setMode(modes.PARAGRAPHS_PREVIEW))
	// }

	const copyParasToText = () => {
		navigator.clipboard.writeText(
			getLetterText(selectedTopics, selectedParagraphs)
		)
	}

	const openInGoogleDoc = async () => {
		//const document = createGoogleDocument(paragraphs);
		const shareableLink = await callGoogleApi(
			getLetterText(selectedTopics, selectedParagraphs)
		)
		console.log('The response for the document is from google: ', shareableLink)
		window.open(shareableLink, '_blank')
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
						{/*	<Button
								type="green"
								text="Next"
								rounded
								extraClasses="footer__actions-next"
								fn={() => handleGoForward()}
							/> */}
					</>
				)}
				{page === pages.PARAGRAPHS_EDIT && isMobile && (
					<>
						<Button
							type="secondary"
							text="Done"
							rounded
							fn={() => navigateTo(pages.PARAGRAPHS_PREVIEW)}
						/>
					</>
				)}
				{page === pages.PARAGRAPHS_PREVIEW && isMobile && (
					<>
						<Button
							type="secondary"
							text="Edit"
							rounded
							fn={() => navigateTo(pages.PARAGRAPHS_EDIT)}
						/>
						<Button
							type="green"
							text="Next"
							rounded
							fn={() => navigateTo(pages.LETTER_PREVIEW)}
						/>
						{/*<Button
							type="tertiary"
							text="Paragraphs"
							rounded
							fn={() => enterLetterPreviewMode()}
						/>
						<Button
							type="tertiary"
							text="Summaries"
							rounded
							fn={() => enterLetterPreviewMode()}
						/>*/}
					</>
				)}
				{page === pages.PARAGRAPHS_PREVIEW && !isMobile && (
					<>
						{/*	<Button
								type="secondary"
								text="Edit"
								rounded
								fn={() => enterParagraphEditMode()}
							/>*/}
						<div className="footer__switch__buttons">
							<button
								className="footer__actions-info"
								aria-label="More info"
								type="button"
								onClick={handleMoreInfo}
							>
								<img src={moreInfoIcon} />
							</button>
							{false && (
								<>
									<Button
										type="tertiary"
										text="Paragraphs"
										rounded
										fn={() => enterLetterPreviewMode()}
									/>
									<Button
										type="tertiary"
										text="Summaries"
										rounded
										fn={() => enterLetterPreviewMode()}
									/>
								</>
							)}
						</div>

						<div>
							<Button
								type="main"
								text="Preview Letter"
								rounded
								fn={() => enterLetterPreviewMode()}
							/>
						</div>
					</>
				)}
				{page === pages.LETTER_PREVIEW && (
					<>
						{/*							<Button
								type="secondary"
								text="Edit"
								rounded
								fn={() => enterParagraphEditMode()}
							/>
							<Button
								type="green"
								text="Create Document"
								rounded
								fn={() => downloadLetter()}
							/>*/}
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
								text="Copy letter text"
								rounded
								fn={copyParasToText}
							/>
							<Button
								type="main"
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