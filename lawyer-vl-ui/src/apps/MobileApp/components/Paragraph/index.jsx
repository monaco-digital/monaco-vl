import React, { useContext } from 'react'
import classNames from 'classnames'
import ScreenContext from '../../context'
import modes from '../../state/modes'
import actionType from '../../state/actionType'

const Paragraph = ({ paragraphText }) => {
	const { state, dispatch } = useContext(ScreenContext)
	const { mode, modeModifier, activeParagraphs } = state
	const handleOnClick = () => {
		// avoid direct dlicks in the paragraphs during edit mode
		if (mode === modes.PARAGRAPHS_EDIT) {
			return
		}

		dispatch({
			type: actionType.SET_ACTIVE_PARAGRAPHS,
			payload: { value: paragraphText },
		})
	}
	const deleteParagraph = () => {
		dispatch({
			type: actionType.DELETE_PARAGRAPH,
			payload: { value: paragraphText },
		})
	}
	const paragraphClasses = classNames('paragraph', {
		'paragraph--reorder': modeModifier === 'PARAGRAPHS_REORDER',
		'paragraph--active':
			(modeModifier !== 'PARAGRAPHS_REORDER' ||
				modeModifier !== 'PARAGRAPHS_DELETION') &&
			activeParagraphs.find(value => value === paragraphText),
	})

	return (
		<div className={paragraphClasses}>
			<button className="paragraph__box" onClick={() => handleOnClick()}>
				<span className="paragraph__text">
					{modeModifier === 'PARAGRAPHS_REORDER' && (
						<i className="paragraph__draghandle fas fa-ellipsis-v"></i>
					)}
					{paragraphText}
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
