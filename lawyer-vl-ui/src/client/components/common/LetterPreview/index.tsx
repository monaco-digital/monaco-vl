import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import AppState from '../../../../data/AppState'
import { CaseTopic, Paragraph } from '../../../../data/types'
import LetterPreviewParagraph from '../LetterPreviewParagraph'
import { getLetterParagraphs, getLetterText } from '../../../../utlis/letter'
import VLcard from '../VLcard'
import ReactGA from 'react-ga'

const LetterPreview: FC = () => {
	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const [isCollapsedIntro, setIsCollapsedIntro] = useState(false)
	const chevronClasses = classNames('fas', {
		'fa-chevron-up': isCollapsedIntro,
		'fa-chevron-down': !isCollapsedIntro,
	})
	const handleCollapseIntro = () => {
		setIsCollapsedIntro(collapseIntro => !collapseIntro)
	}
	const { top, middle, bottom } = getLetterParagraphs(
		selectedTopics,
		selectedParagraphs
	)

	ReactGA.event({
		category: 'User',
		action: `Letter previewed`,
	})

	return (
		<>
			<div className="letter-preview">
				<VLcard
					heading="Draft letter"
					theme="light"
					counter={selectedParagraphs.length}
				>
					<div className="letter-preview__intro">
						{!isCollapsedIntro ? (
							<LetterPreviewParagraph paragraphs={top} />
						) : (
							<p>
								<b>Introduction</b>
							</p>
						)}
						<div className="letter-preview_intro__chevron">
							<button onClick={handleCollapseIntro}>
								<i className={chevronClasses}></i>
							</button>
						</div>
					</div>
					<div className="letter-preview__body">
						<LetterPreviewParagraph paragraphs={middle} />
					</div>
					<div className="letter-preview__signature">
						<LetterPreviewParagraph paragraphs={bottom} />
					</div>
				</VLcard>
			</div>
		</>
	)
}

export default LetterPreview
