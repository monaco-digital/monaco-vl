import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import letter from '../../../data/letter'
import AppState from '../../../../data/AppState'
import { Paragraph } from '../../../../data/types'
import VLcard from '../VLcard'

const LetterPreview: FC = () => {
	const selectedParagraphs = useSelector<AppState, Paragraph[]>(
		state => state.paragraphs.selected
	)
	const [isCollapsedIntro, setIsCollapsedIntro] = useState(false)
	const chevronClasses = classNames('fas', {
		'fa-chevron-up': isCollapsedIntro,
		'fa-chevron-down': !isCollapsedIntro,
	})
	const introClasses = classNames('letter-preview__intro__text', {
		'letter-preview__intro__text--collapsed': isCollapsedIntro,
	})
	const handleCollapseIntro = () => {
		setIsCollapsedIntro(collapseIntro => !collapseIntro)
	}

	return (
		<>
			<div className="letter-preview">
				<VLcard
					heading="Draft letter"
					theme="light"
					counter={selectedParagraphs.length}
				>
					<div className="letter-preview__intro">
						<h1>{letter.title}</h1>
						<div className={introClasses}>
							<p>{letter.intro}</p>
						</div>
						<div className="letter-preview_intro__chevron">
							<button onClick={handleCollapseIntro}>
								<i className={chevronClasses}></i>
							</button>
						</div>
					</div>
					{selectedParagraphs.map(({ paragraph, id }) => (
						<p key={id}>{paragraph}</p>
					))}
					<p>{letter.outro}</p>
				</VLcard>
			</div>
		</>
	)
}

export default LetterPreview
