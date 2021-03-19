import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main';
import ReactGA from 'react-ga';
import ReactMarkdown from 'react-markdown';
import AppState from '../../../../data/AppState';
import VLcard from '../VLcard';
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs';

interface Props {
	paragraph: Advice;
}

const AdviceDocParagraph: FC<Props> = ({ paragraph }: Props) => (
	<div style={{ margin: '10px' }}>
		<ReactMarkdown>{`## ${paragraph.text}`}</ReactMarkdown>
	</div>
);

const AdvicePreview: FC = () => {
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const [adviceParagraphs, setAdviceParagraphs] = useState([]);

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics);
			setAdviceParagraphs(suggestAdviceParagraphs);
		};
		updateAdviceParagraphs();
	}, []);

	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: 'Advice letter previewed',
		});
	}, []);

	return (
		<>
			<div className="letter-preview">
				<VLcard heading="Advice for your situation" theme="light" counter={adviceParagraphs.length}>
					<div className="letter-preview__body">
						{adviceParagraphs.map((paragraph, idx) => (
							<AdviceDocParagraph key={idx} paragraph={paragraph} />
						))}
					</div>
				</VLcard>
			</div>
		</>
	);
};

export default AdvicePreview;
