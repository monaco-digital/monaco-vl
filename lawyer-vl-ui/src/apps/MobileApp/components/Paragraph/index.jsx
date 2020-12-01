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

const Paragraph = ({ paragraphData }) => {
	const [collapsed, setCollapsed] = useState(true)
	const selectedParagraphs = useSelector(state => state.paragraphs.selected)
	const mode = useSelector(state => state.questions.mode)
	const dispatch = useDispatch()
	const { id, paragraph, summary } = paragraphData
	const handleOnClick = event => {
		event.stopPropagation()
		toggleCollapsed()
	}
	const chevronClasses = classNames('fas', {
		'fa-chevron-down': collapsed,
		'fa-chevron-up': !collapsed,
	})
	const toggleCollapsed = () => {
		setCollapsed(collapsed => !collapsed)
	}
	const paragraphClasses = classNames('paragraph', {
		'paragraph--selected': selectedParagraphs.find(
			paragraph => paragraph.id === paragraphData.id
		),
	})

	return (
		<div className={paragraphClasses}>
			{mode === modes.PARAGRAPHS_EDIT && (
				<button
					className="paragraph__delete"
					onClick={() => dispatch(removeSelectedParagraph(id))}
					aria-label="delete paragraph"
				>
					<img src={deleteIcon} alt="" />
				</button>
			)}
			<div className="paragraph__wrapper">
				<div
					className="paragraph__box"
					onClick={() => dispatch(toggleSelectedParagraph(id))}
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
						onClick={event => handleOnClick(event)}
					>
						<i className={chevronClasses}></i>
					</button>
				</div>
			</div>
		</div>
	)
}
export default Paragraph
