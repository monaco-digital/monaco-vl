import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import modes from '../../../state/modes'
import deleteIcon from '../../../assets/img/delete-icon.svg'
import {
	addParagraph,
	removeParagraph,
	toggleParagraph,
} from '../../../../data/paragraphsDataSlice'
import AppState from '../../../../data/AppState'
import { Paragraph as ParagraphT } from '../../../../data/types'
import { Topics } from '../../../../data/types'
import { formatParagraphText } from '../../../utils/formatOutput'
import { ParagraphToggle } from '../../../../types/paragraph'

interface Props {
	paragraphData: ParagraphT
	isMobile?: boolean
	pToggle?: ParagraphToggle
}

const Paragraph: React.FC<Props> = ({
	paragraphData,
	isMobile,
	pToggle = 'summary',
}) => {
	const [collapsed, setCollapsed] = useState(true)
	const [isSelected, setIsSelected] = useState(false)
	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.selected
	)
	const mode = useSelector<AppState, any>(state => state.questions.mode)
	const dispatch = useDispatch()

	useEffect(() => {
		if (pToggle === 'summary') {
			setCollapsed(true)
		} else if (pToggle === 'paragraph') {
			setCollapsed(false)
		}
	}, [pToggle])
	const {
		id,
		paragraph,
		summary,
		topicsOneOf = [],
		topicsAllOf = [],
	} = paragraphData

	const formattedParagraph = formatParagraphText(paragraph)

	const chevronClasses = classNames('fas', {
		'fa-chevron-down': collapsed,
		'fa-minus': !collapsed,
	})
	const paragraphClasses = classNames('paragraph', {
		'paragraph--selected': isMobile
			? selectedParagraphs.find(paragraph => paragraph.id === paragraphData.id)
			: false,
	})
	const topics = [...topicsOneOf, ...topicsAllOf]
	const caseTopics = Topics.filter(({ id }) => topics.includes(id))
	const topicTags = caseTopics
		.map(({ text }) => text)
		.slice(0, !isMobile ? 3 : 1)

	const toggleCollapsed = event => {
		event.stopPropagation()
		setCollapsed(collapsed => !collapsed)
	}

	const handleToggleSelectedParagraph = ({ id }) => {
		if (isMobile) {
			setIsSelected(selected => !selected)
			dispatch(toggleParagraph({ id, toId: 'selected' }))
		}
	}

	return (
		<div className={paragraphClasses}>
			{mode === modes.PARAGRAPHS_EDIT && (
				<button
					className="paragraph__delete"
					onClick={() => dispatch(removeParagraph({ id, fromId: 'selected' }))}
					aria-label="delete paragraph"
				>
					<img src={deleteIcon} alt="" />
				</button>
			)}
			<div className="paragraph__wrapper">
				<div
					className="paragraph__box"
					onClick={() => handleToggleSelectedParagraph({ id })}
				>
					<p className="paragraph__text">
						{collapsed ? <>{summary}</> : <> {formattedParagraph} </>}
					</p>
				</div>
				<footer>
					<div className="paragraph__topics">
						{topicTags.map(tag => (
							<span className="paragraph__topics-topic">
								<div className=" paragraph__topics-topic__wrapper">{tag}</div>
							</span>
						))}
					</div>
					<button
						className="paragraph__chevron"
						aria-label="toggle paragraph summary"
						onClick={event => toggleCollapsed(event)}
					>
						<span className="paragraph__chevron__see-more">
							{collapsed ? 'See more' : 'See less'}
						</span>
						<i className={chevronClasses}></i>
					</button>
				</footer>
			</div>
		</div>
	)
}
export default Paragraph
