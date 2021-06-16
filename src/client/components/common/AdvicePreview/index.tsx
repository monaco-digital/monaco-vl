import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CaseTopic, Advice } from 'api/vl/models';
import ReactGA from 'react-ga';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { Box, Fab } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

import AppState from '../../../../data/AppState';
import EndToEndStepper from '../EndToEndStepper';
import PreviewAdviceExplanation from '../PreviewAdviceExplanation';
import VLcard from '../VLcard';
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs';

interface Props {
	paragraph: Advice;
}

const AdviceDocParagraph: FC<Props> = ({ paragraph }: Props) => (
	<div style={{ margin: '10px' }}>
		<ReactMarkdown linkTarget="_blank">{paragraph.text}</ReactMarkdown>
	</div>
);

const AdvicePreview: FC = () => {
	const history = useHistory();
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);

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
		history.replace('/preview/_ADV/checkout/email');
	};

	const handleNext = () => {
		history.push('/start-legal-process'); // Go to step 2
	};

	return (
		<>
			<div className="flex-col w-full">
				<EndToEndStepper step={0} />
				<div className="letter-preview">
					<PreviewAdviceExplanation />
					<VLcard heading="Your advice note" theme="light">
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
						<Box px={1}>
							<Fab variant="extended" color="inherit" onClick={history.goBack}>
								Back
							</Fab>
						</Box>
						<Box px={1}>
							<Fab variant="extended" color="primary" onClick={openCheckoutModal}>
								<GetApp />
								&nbsp;Email
							</Fab>
						</Box>
						<Box px={1}>
							<Fab variant="extended" color="secondary" id="nextButton" onClick={handleNext}>
								Next
							</Fab>
						</Box>
					</Box>
				</div>
			</div>
		</>
	);
};

export default AdvicePreview;
