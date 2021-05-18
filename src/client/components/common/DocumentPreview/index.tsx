import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactGA from 'react-ga';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Fab } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

import { TemplateParagraph } from 'api/vl/models';
import AppState from '../../../../data/AppState';
import {
	SessionDocumentComponent,
	SessionDocumentSection,
	SessionParagraph,
	SessionDocument,
} from '../../../../types/SessionDocument';
import EndToEndStepper from '../EndToEndStepper';
import PreviewLetterExplanation from '../PreviewLetterExplanation';
import { PreviewParagraph } from '../DocumentPreviewComponents';
import { createSessionDocument } from '../../../../utils/sessionDocument';
import VLcard from '../VLcard';
import { getTemplate } from '../../../../api/vl';
import { updateSessionDocument, updateCurrentSessionDocument } from '../../../../data/sessionDataSlice';
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

const triggerGAEvent = id => {
	switch (id) {
		case '_LET': {
			ReactGA.event({
				category: 'User',
				action: 'Letter Previewed',
			});
			break;
		}
		case '_WP': {
			ReactGA.event({
				category: 'User',
				action: 'WP Letter Previewed',
			});
			break;
		}
		case '_ET': {
			ReactGA.event({
				category: 'User',
				action: 'Tribunal Letter Previewed',
			});
			break;
		}
		case '_GR': {
			ReactGA.event({
				category: 'User',
				action: 'Grievance Letter Previewed',
			});
			break;
		}
		case '_RES_CD': {
			ReactGA.event({
				category: 'User',
				action: 'Complete Denial Response',
			});
			break;
		}
		case '_RES_CO': {
			ReactGA.event({
				category: 'User',
				action: 'Counter Offer Response',
			});
			break;
		}
		case '_RES_I': {
			ReactGA.event({
				category: 'User',
				action: 'Investigating Response',
			});
			break;
		}
		case '_RES_KM': {
			ReactGA.event({
				category: 'User',
				action: 'Want To Keep Me Response',
			});
			break;
		}
		default:
			break;
	}
};

const DocumentPreview: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { id = '_WP' } = useParams();
	const paragraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs);
	const selectedParagraphs = paragraphs.filter(
		suggested =>
			suggested.isSelected &&
			// Filters out paragraphs not meant to display on this template.
			(suggested.templateComponent as TemplateParagraph).paragraph.topicsNoneOf.every(t => t !== id),
	);

	const isDsFlow = useSelector<AppState, boolean>(state => state.features.dsFlow);
	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocuments[id]);

	triggerGAEvent('_LET');
	triggerGAEvent(id);

	const handleNext = () => {
		switch (id) {
			case '_WP':
				history.push('/progress-legal-case'); // Go to step 3
				break;
			case '_ET':
			case '_GR':
			case '_RES_CD':
			case '_RES_CO':
			case '_RES_I':
			case '_RES_KM':
				history.push('/step/settlement');
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		const updatedTemplate = getTemplate(id);

		if (!sessionDocument) {
			const document = createSessionDocument(updatedTemplate, selectedParagraphs);
			dispatch(updateSessionDocument({ document, type: id }));
		}

		dispatch(updateCurrentSessionDocument(id));
	}, [dispatch, id, selectedParagraphs, sessionDocument]);

	const openCheckoutModal = () => {
		history.replace(`/preview/${id}/checkout/email`);
	};

	return (
		<>
			<div className="flex-col w-full">
				<EndToEndStepper step={id === '_WP' ? 1 : 2} />
				<div className="letter-preview">
					<PreviewLetterExplanation letter={id} />
					<VLcard heading="Draft letter" theme="light" counter={selectedParagraphs.length}>
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
							{isDsFlow && (
								<Fab variant="extended" onClick={downloadDataForDS}>
									Download
								</Fab>
							)}
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

export default DocumentPreview;
