import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { BulletPoints, CaseTopic, Paragraph as ParagraphT, ParagraphComponent } from '../../../../data/types'
import Button from '../../Button'
import { setPage } from '../../../../data/navigationDataSlice'
import pages from '../../../../types/navigation'
import { addParagraph, removeParagraph, updateSuggestedParagraphs } from '../../../../data/paragraphsDataSlice'
import { addUserField, setActiveParagraphComponent } from '../../../../data/userFieldsSlice'

interface Props {}

const StatementSelect: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch()
	const activeParagraph = useSelector<any, any>(state => state.userFields.active)
	const [areParagraphComponentsVisible, setAreParagraphComponentsVisible] = useState(false)

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.topics.selected)

	const suggestedParagraphs = useSelector<AppState, ParagraphT[]>(state => state.paragraphs.suggested)

	const selectedParagraphs = useSelector<AppState, ParagraphT[]>(state => state.paragraphs.selected)

	useEffect(() => {
		dispatch(updateSuggestedParagraphs(selectedTopics))
	}, [selectedTopics])

	const handleOnClick = (paragraph: ParagraphT) => {
		const { id, paragraphComponents } = paragraph
		const hasParagraphComponents = !!paragraphComponents.length
		const selected = selectedParagraphs.some(paragraph => id === paragraph.id)

		if (selected) {
			dispatch(removeParagraph({ id, fromId: 'selected' }))
		} else {
			dispatch(addParagraph({ id, toId: 'selected' }))
		}

		if (hasParagraphComponents) {
			dispatch(setActiveParagraphComponent(paragraph))
			setAreParagraphComponentsVisible(true)
		}
	}

	const enterLetterPreviewMode = () => {
		dispatch(setPage(pages.LETTER_PREVIEW))
	}

	const statements = suggestedParagraphs.map((paragraph, i) => {
		const { id, summary } = paragraph
		const selected = selectedParagraphs.some(paragraph => id === paragraph.id)
		return (
			<div key={`value ${i}`} className="topic" onClick={() => handleOnClick(paragraph)}>
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
			{areParagraphComponentsVisible && <ParagraphComponents activeParagraph={activeParagraph} />}
		</>
	)
}

const ParagraphComponents = ({ activeParagraph }: { activeParagraph: ParagraphT }) => {
	const dispatch = useDispatch()
	const [userFilledFields, setUserFilledFields] = useState({})
	const { id, paragraphComponents } = activeParagraph

	const handleOnClick = () => {
		dispatch(addUserField({ id, userFilledFields }))
	}

	return (
		<div className="user-fields">
			{paragraphComponents.map(paragraphComponent => {
				switch (paragraphComponent.type) {
					case 'BulletPoints':
						return (
							<ParagraphComponentBulletPoints
								bulletPoints={paragraphComponent.bulletPoints}
								setUserFilledFields={setUserFilledFields}
							/>
						)
					case 'StaticText':
						return <p>Nope (StaticText).</p>
					case 'Dropdown':
						return <p>Nope (Dropdown).</p>
					default:
						return null
				}
			})}
			<button type="button" onClick={handleOnClick}>
				Confirm
			</button>
		</div>
	)
}

const ParagraphComponentBulletPoints = ({ bulletPoints, setUserFilledFields }) => {
	const [values, setValues] = useState([])
	const handleOnChange = event => {
		const { value } = event.target
		setUserFilledFields()
	}

	return (
		<div className="user-fields__bullet-points">
			<h2>Bullet points</h2>
			{bulletPoints.map(bulletPoint => {
				return (
					<div className="user-fields__bullet-point__field">
						<textarea placeholder={bulletPoint.placeholder} />
					</div>
				)
			})}
		</div>
	)
}

export default StatementSelect
