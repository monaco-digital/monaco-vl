import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic, Paragraph as ParagraphT } from '../../../../data/types'
import Button from '../../Button'
import { setPage } from '../../../../data/navigationDataSlice'
import pages from '../../../../types/navigation'
import {
	addParagraph,
	removeParagraph,
	updateSuggestedParagraphs,
} from '../../../../data/paragraphsDataSlice'
import ReactGA from 'react-ga'

interface Props {}

const StatementSelect: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch()

	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)

	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.suggested
	)

	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(
		state => state.paragraphs.selected
	)

	useEffect(() => {
		dispatch(updateSuggestedParagraphs(selectedTopics))
	}, [selectedTopics])

	const handleOnClick = (id: string) => {
		ReactGA.event({
			category: 'User',
			action: `Selected statement ${id}`,
		})
		const selected = selectedParagraphs.some(paragraph => id === paragraph.id)
		if (selected) {
			dispatch(removeParagraph({ id, fromId: 'selected' }))
		} else {
			dispatch(addParagraph({ id, toId: 'selected' }))
		}
	}

	const enterLetterPreviewMode = () => {
		dispatch(setPage(pages.LETTER_PREVIEW))
	}

	const statements = suggestedParagraphs.map((paragraph, i) => {
		const { id, summary } = paragraph
		const selected = selectedParagraphs.some(paragraph => id === paragraph.id)
		return (
			<div
				key={`value ${i}`}
				className="topic"
				onClick={() => handleOnClick(id)}
			>
				<input
					type={'checkbox'}
					id={''}
					name={summary}
					value={summary}
					checked={selected}
				/>
				<label htmlFor={id}>{summary}</label>
			</div>
		)
	})

	return (
		<>
			<div className="questions">
				<h1 className="title">Select all the statements that apply to you</h1>
				<div className="topics">{statements}</div>
				<div className="">
					<Button
						type="main"
						text="Preview Letter"
						rounded
						fn={() => enterLetterPreviewMode()}
					/>
				</div>
			</div>
		</>
	)
}

export default StatementSelect
