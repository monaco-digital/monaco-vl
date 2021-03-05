import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AppState from '../../../../data/AppState'
import { CaseTopic, BulletPoints, DocumentParagraph, TemplateParagraph } from '@monaco-digital/vl-types/lib/main'
import Button from '../../Button'
import { updateSuggestedParagraphs, selectParagraphs, deselectParagraphs } from '../../../../data/sessionDataSlice'
import { SessionParagraph } from '../../../../types/SessionDocument'
import { getSuggestedParagraphs } from '../../../../api/vl'
import ReactGA from 'react-ga'
import _ from 'lodash'

interface Props {}

const StatementSelect: React.FC<Props> = (props: Props) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const [activeParagraph, setActiveParagraph] = useState(null)
	// const activeParagraph = useSelector<any, any>(state => state.userFields.active)
	const [areParagraphComponentsVisible, setAreParagraphComponentsVisible] = useState(false)

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const selectedTopicIds = selectedTopics.map(t => t.id)
	if (_.intersection(selectedTopicIds, ['_RES_CD', '_RES_CO', '_RES_I', '_RES_KM']).length > 0) {
		history.push('/preview')
	}

	const suggestedParagraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs)

	useEffect(() => {
		const updateParagraphs = async () => {
			const paragraphs = await getSuggestedParagraphs(selectedTopics)
			const sessionParagraphs = paragraphs.map(paragraph => {
				return {
					templateComponent: paragraph,
					documentComponent: null,
					isSelected: false,
				} as SessionParagraph
			})
			dispatch(updateSuggestedParagraphs(sessionParagraphs))
		}
		updateParagraphs()
	}, [])

	const handleOnClick = (id: string) => {
		const selectedSessionParagraph = suggestedParagraphs.find(paragraph => paragraph.templateComponent.id === id)
		if (!selectedSessionParagraph.isSelected) {
			dispatch(selectParagraphs([id]))
		} else {
			dispatch(deselectParagraphs([id]))
		}

		const paragraph = selectedSessionParagraph.templateComponent as TemplateParagraph
		ReactGA.event({
			category: 'User',
			action: `Selected statement: ${paragraph?.paragraph.summary.substring(0, 30)} - ${id}`,
		})
	}

	const enterLetterPreviewMode = () => {
		history.push('/preview')
	}

	const statements = suggestedParagraphs.map((sessionParagraph, i) => {
		const templateParagraph = sessionParagraph.templateComponent as TemplateParagraph
		const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph
		const { id, summary } = templateParagraph.paragraph
		const selected = sessionParagraph.isSelected
		const hasUserInput = templateParagraph.paragraph.paragraphComponents.find(
			pc => pc.type === 'BulletPoints'
		) as BulletPoints
		const displayInput = hasUserInput && documentParagraph
		const topicList = getTopicsList(templateParagraph)

		return (
			<div key={`value ${i}`} className="topic" onClick={() => handleOnClick(id)}>
				<input type={'checkbox'} id={''} name={summary} value={summary} checked={selected} />
				<label htmlFor={id}>{summary}</label>
				{displayInput && documentParagraph.documentParagraphComponents}
			</div>
		)
	})

	/*
		<div>Env: {process.env.NODE_ENV}</div>
		<div>{selectedTopics.map(t => t.id).join(', ')}</div>
	*/

	return (
		<>
			<div className="questions">
				<h1 className="title">Select all the statements that apply to you</h1>
				<div className="topics">{statements}</div>
				<div className="">
					<Button type="main" text="Preview Letter" rounded fn={() => enterLetterPreviewMode()} />
				</div>
			</div>
		</>
	)
}

const getTopicsList = (templateParagraph: TemplateParagraph): string => {
	const { topicsAllOf, topicsOneOf, topicsNoneOf } = templateParagraph.paragraph
	return `A:${topicsAllOf.join(', ')}|O:${topicsOneOf.join(', ')}|N:${topicsNoneOf.join(', ')}`
}
/*
{areParagraphComponentsVisible && <ParagraphComponents activeParagraph={activeParagraph} />}

const ParagraphComponents = ({ activeParagraph }: { activeParagraph: Paragraph }) => {
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
						const bulletPoints = paragraphComponent as BulletPoints
						return (
							<ParagraphComponentBulletPoints
								bulletPoints={bulletPoints.bulletPoints}
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
*/
export default StatementSelect
