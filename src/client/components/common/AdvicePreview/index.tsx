import React, { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CaseTopic, Advice } from 'api/vl/models';
import ReactGA from 'react-ga';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { Fab } from '@material-ui/core';

import AppState from '../../../../data/AppState';
import EndToEndStepper from '../EndToEndStepper';
import PreviewAdviceExplanation from '../PreviewAdviceExplanation';
import VLcard from '../VLcard';
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs';
import MobileEndToEndStepper from '../MobileEndToEndStepper';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

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

	const handleNext = () => {
		history.push('/start-legal-process'); // Go to step 2
	};

	const nextButton = () => {
		return (
			<Fab
				variant="extended"
				color="secondary"
				id="nextButton"
				onClick={handleNext}
				className="letter-preview__action-button"
			>
				Next
			</Fab>
		);
	};

	const backButton = () => {
		return (
			<Fab variant="extended" color="inherit" onClick={history.goBack} className="letter-preview__action-button">
				Back
			</Fab>
		);
	};

	return (
		<>
			<div className="flex-col w-full">
				<ScrollToTopOnMount />
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
					<div className="letter-preview__action-buttons navigation-buttons">
						<Fab variant="extended" color="inherit" onClick={history.goBack} className="letter-preview__action-button">
							Back
						</Fab>
						<Fab
							variant="extended"
							color="secondary"
							id="nextButton"
							onClick={handleNext}
							className="letter-preview__action-button"
						>
							Next
						</Fab>
					</div>
					<div className="w-full">
						<MobileEndToEndStepper step={0} nextButton={nextButton()} backButton={backButton()} />
					</div>
				</div>
			</div>
		</>
	);
};

export default AdvicePreview;
