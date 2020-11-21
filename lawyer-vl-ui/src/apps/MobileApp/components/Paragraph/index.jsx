import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'
import modes from '../../state/modes'
import actionType from '../../state/actionType'

const Paragraph = ({ paragraphData }) => {
	const [collapsed, setCollapsed] = useState(true)
	const { state, dispatch } = useContext(ScreenContext)
	const { mode, activeParagraphs, modeModifier } = state
	const { id, paragraph, summary, verticalHeight } = paragraphData
	const handleOnClick = () => {
		toggleCollapsed()
		// avoid direct dlicks in the paragraphs during edit mode
		// if (mode === modes.PARAGRAPHS_EDIT) {
		// 	return
		// }

		// dispatch({
		// 	type: actionType.SET_ACTIVE_PARAGRAPHS,
		// 	payload: { value: id },
		// })
	}
	const deleteParagraph = () => {
		dispatch({
			type: actionType.DELETE_PARAGRAPH,
			payload: { value: id },
		})
	}
	const paragraphClasses = classNames('paragraph', {
		'paragraph--reorder': modeModifier === 'PARAGRAPHS_REORDER',
		'paragraph--active':
			(modeModifier !== 'PARAGRAPHS_REORDER' ||
				modeModifier !== 'PARAGRAPHS_DELETION') &&
			activeParagraphs.find(value => value === id),
	})
	const chevronClasses = classNames('fas', {
		'fa-chevron-down': collapsed,
		'fa-chevron-up': !collapsed,
	})
	const toggleCollapsed = () => {
		setCollapsed(collapsed => !collapsed)
	}

	return (
		<div className={paragraphClasses}>
			<button className="paragraph__box" onClick={() => handleOnClick()}>
				<span className="paragraph__text">
					{modeModifier === 'PARAGRAPHS_REORDER' && (
						<i className="paragraph__draghandle fas fa-ellipsis-v"></i>
					)}
					{collapsed ? summary : paragraph}
				</span>
				<span className="paragraph__chevron">
					<i className={chevronClasses}></i>
				</span>
			</button>
			{modeModifier === 'PARAGRAPHS_DELETION' && (
				<button onClick={() => deleteParagraph()}>
					<i className="paragraph__delete fas fa-minus-circle"></i>
				</button>
			)}
		</div>
	)
}

export default Paragraph
