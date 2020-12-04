import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import modes from '../../state/modes'
import truncatedIcon from './../../assets/img/truncated-icon.svg'
import deleteIcon from './../../assets/img/delete-icon.svg'
import {
	toggleSelectedParagraph,
	removeSelectedParagraph,
} from '../../../../data/paragraphsDataSlice'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'

interface Props {
	paragraphData: ParagraphT
	isDesktop?: boolean
}

const Paragraph: React.FC<Props> = ({ paragraphData, isDesktop }) => {
	const [collapsed, setCollapsed] = useState(true)
	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.selected
	)
	const mode = useSelector<AppState, any>(state => state.questions.mode)
	const dispatch = useDispatch()
	const { id, paragraph, summary } = paragraphData
	const chevronClasses = classNames('fas', {
		'fa-chevron-down': collapsed,
		'fa-chevron-up': !collapsed,
	})
	const paragraphClasses = classNames('paragraph', {
		'paragraph--selected':
			selectedParagraphs.find(paragraph => paragraph.id === paragraphData.id) &&
			!isDesktop,
	})

	const toggleCollapsed = event => {
		event.stopPropagation()
		setCollapsed(collapsed => !collapsed)
	}

	const handleToggleSelectedParagraph = () => {
		if (!isDesktop) {
			dispatch(toggleSelectedParagraph(id))
		}
	}

	const removeParagraph = () => {
		dispatch(removeSelectedParagraph(id))
	}

	return (
		<div className={paragraphClasses}>
			{mode === modes.PARAGRAPHS_EDIT && (
				<button
					className="paragraph__delete"
					onClick={() => removeParagraph()}
					aria-label="delete paragraph"
				>
					<img src={deleteIcon} alt="" />
				</button>
			)}
			<div className="paragraph__wrapper">
				<div
					className="paragraph__box"
					onClick={() => handleToggleSelectedParagraph()}
				>
					<span className="paragraph__text">
						{collapsed ? (
							<>
								{summary}
								<img src={truncatedIcon} className="paragraph__truncated" />
							</>
						) : (
							<> {paragraph} </>
						)}
					</span>
					<button
						className="paragraph__chevron"
						aria-label="toggle paragraph summary"
						onClick={event => toggleCollapsed(event)}
					>
						<i className={chevronClasses}></i>
					</button>
				</div>
			</div>
		</div>
	)
}
export default Paragraph
