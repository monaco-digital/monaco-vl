import React from 'react'
import Button from '../common/Button'
import modes from '../../state/modes'
import moreInfoIcon from './../../assets/img/more-info-icon.svg'
import dragIcon from './../../assets/img/drag-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setView, setMode } from '../../../data/questionDataSlice'
import AppState from '../../../data/AppState'
import { CaseTopic } from '../../../data/types'

const Footer: React.FC = () => {
	const mode = useSelector<AppState, keyof typeof modes>(
		state => state.navigation.mode
	)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const dispatch = useDispatch()

	const handleGoBack = () => {}
	const handleMoreInfo = () => {}
	const handleGoForward = () => {
		dispatch(setView(selectedTopics))
	}
	const enterLetterPreviewMode = () => {
		dispatch(setMode(modes.LETTER_PREVIEW))
	}
	const enterParagraphPreviewMode = () => {
		dispatch(setMode(modes.PARAGRAPHS_PREVIEW))
	}
	const enterParagraphEditMode = () => {
		dispatch(setMode(modes.PARAGRAPHS_EDIT))
	}
	const downloadLetter = async () => {
		// TODO find out how this is going to be implemented, if any.
		// const docBlob = await createLetterDocx(selectedParagraphs)
		// saveAs(docBlob, 'Your letter.docx')
	}

	return (
		<footer className="footer">
			<div className="footer__actions">
				{mode === modes.GET_STARTED && <></>}
				{mode === modes.TOPICS && (
					<>
						<button
							className="footer__actions-info"
							aria-label="More info"
							type="button"
							onClick={handleMoreInfo}
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
				{mode === modes.PARAGRAPHS_EDIT && (
					<>
						<Button
							type="secondary"
							text="Done"
							rounded
							fn={() => enterParagraphPreviewMode()}
						/>
						<button
							className="footer__actions-drag"
							aria-label="drag to reorder"
						>
							<img src={dragIcon} alt="" />
							Drag to reorder
						</button>
					</>
				)}
				{mode === modes.PARAGRAPHS_PREVIEW && (
					<>
						{/*	<Button
								type="secondary"
								text="Edit"
								rounded
								fn={() => enterParagraphEditMode()}
							/>*/}
						<button
							className="footer__actions-info"
							aria-label="More info"
							type="button"
							onClick={handleMoreInfo}
						>
							<img src={moreInfoIcon} />
						</button>

						<Button
							type="main"
							text="Preview Letter"
							rounded
							fn={() => enterLetterPreviewMode()}
						/>
					</>
				)}
				{mode === modes.LETTER_PREVIEW && (
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
						<Button
							type="secondary"
							text="Copy letter text"
							rounded
							fn={() => {}}
						/>
						<Button
							type="main"
							text="Create Google Doc"
							rounded
							fn={() => {}}
						/>
					</>
				)}
			</div>
		</footer>
	)
}

export default Footer
