import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main'
import VLcard from '../VLcard'
import ReactGA from 'react-ga'
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs'
import ReactMarkdown from 'react-markdown'

interface Props {
	paragraph: Advice
}

const AdviceDocParagraph: FC<Props> = ({ paragraph }: Props) => {
	return (
		<div style={{ margin: '10px' }}>
			<ReactMarkdown>{'## ' + paragraph.text}</ReactMarkdown>
		</div>
	)
}

const AdvicePreview: FC = () => {
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)
	const [adviceParagraphs, setAdviceParagraphs] = useState([])

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics)
			setAdviceParagraphs(suggestAdviceParagraphs)
		}
		updateAdviceParagraphs()
	}, [])

	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: `Advice letter previewed`,
		})
	}, [])

	return (
		<>
			<div className="letter-preview">
				<VLcard heading="Advice for your situation" theme="light" counter={adviceParagraphs.length}>
					<div className="letter-preview__body">
						{adviceParagraphs.map((paragraph, idx) => {
							return <AdviceDocParagraph key={idx} paragraph={paragraph} />
						})}
					</div>
				</VLcard>
			</div>
		</>
	)
}

export default AdvicePreview
