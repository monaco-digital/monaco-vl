import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CaseTopic, Advice } from '@monaco-digital/vl-types/lib/main';
import ReactGA from 'react-ga';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { Box, Fab } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import moreInfoIcon from '../../../assets/img/more-info-icon.svg';

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
	const history = useHistory();
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const isMonetizationEnabled = useSelector<AppState, boolean>(state => state.features.enableMonetization);

	const [adviceParagraphs, setAdviceParagraphs] = useState([]);

	useEffect(() => {
		const updateAdviceParagraphs = async () => {
			const suggestAdviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics);
			setAdviceParagraphs(suggestAdviceParagraphs);
		};
		updateAdviceParagraphs();
	}, [selectedTopics]);

	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: 'Advice letter previewed',
		});
	}, []);

	const openCheckoutModal = () => {
		const freeTopicTemplates = ['_RES', '_ADV'];
		const isFree = selectedTopics.some(topic => freeTopicTemplates.includes(topic.id));

		if (isMonetizationEnabled && !isFree) {
			history.push('/preview/checkout');
		} else {
			history.push('/preview/checkout/email');
		}
	};

	return (
		<>
			<div className="letter-preview">
				<VLcard heading="Advice for your situation" theme="light" counter={adviceParagraphs.length}>
					<div className="letter-preview__body">
						{adviceParagraphs.map(paragraph => (
							<AdviceDocParagraph key={paragraph.id} paragraph={paragraph} />
						))}
					</div>
				</VLcard>

				<Box
					position="fixed"
					width="90%"
					maxWidth="48rem"
					bottom={16}
					zIndex={10}
					display="flex"
					flexDirection="row"
					justifyContent="flex-end"
				>
					<Box flexGrow={1}>
						<Fab color="primary" onClick={() => history.push('/help')}>
							<img src={moreInfoIcon} alt="More Info" />
						</Fab>
					</Box>

					<Box px={1}>
						<Fab variant="extended" color="inherit" onClick={history.goBack}>
							Back
						</Fab>
					</Box>
					<Box px={1}>
						<Fab variant="extended" color="secondary" onClick={openCheckoutModal}>
							<GetApp />
							&nbsp;Download
						</Fab>
					</Box>
				</Box>
			</div>
		</>
	);
};

export default AdvicePreview;
