import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CaseTopic, Template } from '@monaco-digital/vl-types/lib/main';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Box, Fab } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import moreInfoIcon from '../../../assets/img/more-info-icon.svg';

import AppState from '../../../../data/AppState';
import {
	SessionDocumentComponent,
	SessionDocumentSection,
	SessionParagraph,
	SessionDocument,
} from '../../../../types/SessionDocument';
import { PreviewParagraph } from '../DocumentPreviewComponents';
import { createSessionDocument } from '../../../../utils/sessionDocument';
import VLcard from '../VLcard';
import { getTemplate } from '../../../../api/vl';
import { updateSessionDocument, updateSelectedTemplate } from '../../../../data/sessionDataSlice';
import { downloadDataForDS } from '../../../../ds';

interface Props {
	sessionDocumentComponents: SessionDocumentComponent[];
}

const SessionDocComponents: FC<Props> = ({ sessionDocumentComponents }: Props) => {
	if (!sessionDocumentComponents) return null;
	const output = sessionDocumentComponents.map(sessionDocumentComponent => {
		const type = sessionDocumentComponent && sessionDocumentComponent.type;
		switch (type) {
			case 'UserContentSection': {
				const userContentSection = sessionDocumentComponent as SessionDocumentSection;
				return <SessionDocComponents sessionDocumentComponents={userContentSection.sessionDocumentComponents} />;
			}
			case 'TemplateContentSection': {
				const templateContentSection = sessionDocumentComponent as SessionDocumentSection;
				return <SessionDocComponents sessionDocumentComponents={templateContentSection.sessionDocumentComponents} />;
			}
			case 'Paragraph': {
				const sessionParagraph = sessionDocumentComponent as SessionParagraph;
				return <PreviewParagraph paragraph={sessionParagraph} />;
			}
			default:
				return null;
		}
	});
	return <>{output.concat()}</>;
};

const DocumentPreview: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const selectedParagraphs = useSelector<AppState, SessionParagraph[]>(state =>
		state.session.suggestedParagraphs.filter(suggested => suggested.isSelected),
	);
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const isMonetizationEnabled = useSelector<AppState, boolean>(state => state.features.enableMonetization);
	const selectedTemplate = useSelector<AppState, Template>(state => state.session.selectedTemplate);
	const isDsFlow = useSelector<AppState, boolean>(state => state.features.dsFlow);

	const isBlur = isMonetizationEnabled && selectedTopics.some(({ id }) => id === '_LET');

	const updatedTemplate = getTemplate(selectedTopics);

	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocument);
	useEffect(() => {
		const isTemplateIdDifferent = updatedTemplate?.id !== selectedTemplate?.id;
		if (isTemplateIdDifferent) {
			dispatch(updateSelectedTemplate(updatedTemplate));
		}
		if (!sessionDocument || isTemplateIdDifferent) {
			const doc = createSessionDocument(updatedTemplate, selectedParagraphs);
			dispatch(updateSessionDocument(doc));
		}
	}, [dispatch, selectedParagraphs, selectedTemplate?.id, sessionDocument, updatedTemplate]);

	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: 'Letter previewed',
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
				<VLcard heading="Draft letter" theme="light" counter={selectedParagraphs.length} blur={isBlur}>
					<div className="letter-preview__body">
						<SessionDocComponents sessionDocumentComponents={sessionDocument?.sessionDocumentComponents} />
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
						{isDsFlow && (
							<Fab type="extended" onclick={downloadDataForDS}>
								Download
							</Fab>
						)}
					</Box>
				</Box>
			</div>
		</>
	);
};

export default DocumentPreview;
