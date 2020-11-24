import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'
import modes from '../../state/modes'
import actionType from '../../state/actionType'
import truncatedIcon from './../../assets/img/truncated-icon.svg'
import deleteIcon from './../../assets/img/delete-icon.svg'

const Paragraph = ({ paragraphData }) => {
	const [collapsed, setCollapsed] = useState(true)
	const { state, dispatch } = useContext(ScreenContext)
	const { mode, selectedParagraphs } = state
	const { id, paragraph, summary } = paragraphData
	const handleOnClick = event => {
		event.stopPropagation()
		toggleCollapsed()
	}
	const selectParagraph = paragraphData => {
		dispatch({
			type: actionType.SET_SELECTED_PARAGRAPHS,
			payload: { value: paragraphData },
		})
	}
	const deleteParagraph = () => {
		dispatch({
			type: actionType.DELETE_PARAGRAPH,
			payload: { value: id },
		})
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
					onClick={() => deleteParagraph()}
					aria-label="delete paragraph"
				>
					<img src={deleteIcon} alt="" />
				</button>
			)}
			<div className="paragraph__wrapper">
				<div
					className="paragraph__box"
					onClick={() => selectParagraph(paragraphData)}
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
