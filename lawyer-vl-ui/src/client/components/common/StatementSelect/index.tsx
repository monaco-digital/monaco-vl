import React, { useEffect, useState } from 'react'
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
	addSelectedParagraphUserFields,
} from '../../../../data/paragraphsDataSlice'

interface Props {}

const StatementSelect: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch()
	const [userFields, setUserFields] = useState<{
		visible: boolean
		id: string
		reasons?: string[]
	}>({
		visible: false,
		id: '',
		reasons: [],
	})

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.topics.selected)

	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(state => state.paragraphs.suggested)

	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(state => state.paragraphs.selected)

	useEffect(() => {
		dispatch(updateSuggestedParagraphs(selectedTopics))
	}, [selectedTopics])

	const handleOnClick = (id: string, hasUserFields: boolean) => {
		console.log('Calling handle click with: ', id)
		const selected = selectedParagraphs.some(paragraph => id === paragraph.id)

		if (selected) {
			dispatch(removeParagraph({ id, fromId: 'selected' }))
		} else {
			dispatch(addParagraph({ id, toId: 'selected' }))
		}

		const initUserFields = {
			id,
			visible: true,
		}

		if (hasUserFields) {
			setUserFields(initUserFields)
		}
	}

	const enterLetterPreviewMode = () => {
		dispatch(setPage(pages.LETTER_PREVIEW))
	}

	const statements = suggestedParagraphs.map((paragraph, i) => {
		const { id, summary, hasUserFields } = paragraph
		const selected = selectedParagraphs.some(paragraph => id === paragraph.id)
		return (
			<div key={`value ${i}`} className="topic" onClick={() => handleOnClick(id, hasUserFields)}>
				<input type={'checkbox'} id={''} name={summary} value={summary} checked={selected} />
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
					<Button type="main" text="Preview Letter" rounded fn={() => enterLetterPreviewMode()} />
				</div>
			</div>
			{userFields.visible && <StatementSelectUserFields userFieldsState={{ userFields, setUserFields }} />}
		</>
	)
}

const StatementSelectUserFields = ({ userFieldsState }) => {
	const dispatch = useDispatch()
	const dsa = () => {
		dispatch(addSelectedParagraphUserFields(userFieldsState.userFields))
	}
	return (
		<>
			<div className="user-fields">
				<input type="text" />
				<input type="text" />
				<input type="text" />
				<button type="button" onClick={dsa}>
					yeah
				</button>
			</div>
		</>
	)
}

export default StatementSelect
