import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import modes from '../../../state/modes'
import deleteIcon from '../../../assets/img/delete-icon.svg'
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
	const {
		id,
		paragraph,
		summary,
		topicsOneOf = [],
		topicsAllOf = [],
	} = paragraphData
	const chevronClasses = classNames('fas', {
		'fa-chevron-down': collapsed,
		'fa-minus': !collapsed,
	})
	const paragraphClasses = classNames('paragraph', {
		'paragraph--selected':
			selectedParagraphs.find(paragraph => paragraph.id === paragraphData.id) &&
			!isDesktop,
	})
	const topics = [...topicsOneOf, ...topicsAllOf]
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
					<p className="paragraph__text">
						{collapsed ? <>{summary}</> : <> {paragraph} </>}
					</p>
				</div>
				<footer>
					<div className="paragraph__topics">
						<span className="paragraph__topics-topic">
							<div className=" paragraph__topics-topic__wrapper">Topic 1</div>
						</span>
						<span className="paragraph__topics-topic">
							<div className=" paragraph__topics-topic__wrapper">Topic 2</div>
						</span>
						<span className="paragraph__topics-topic">
							<div className=" paragraph__topics-topic__wrapper">Topic 3</div>
						</span>
					</div>
					<button
						className="paragraph__chevron"
						aria-label="toggle paragraph summary"
						onClick={event => toggleCollapsed(event)}
					>
						{collapsed ? 'See more' : 'See less'}
						<i className={chevronClasses}></i>
					</button>
				</footer>
			</div>
		</div>
	)
}
export default Paragraph
