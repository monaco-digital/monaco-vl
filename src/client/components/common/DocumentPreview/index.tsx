import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CaseTopic, Template } from '@monaco-digital/vl-types/lib/main';
import ReactGA from 'react-ga';
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

interface Props {
	sessionDocumentComponents: SessionDocumentComponent[];
}

const SessionDocComponents: FC<Props> = ({ sessionDocumentComponents }: Props) => {
	if (!sessionDocumentComponents) return null;
	const output = sessionDocumentComponents.map((sessionDocumentComponent) => {
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
	const selectedParagraphs = useSelector<AppState, SessionParagraph[]>((state) =>
		state.session.suggestedParagraphs.filter((suggested) => suggested.isSelected),
	);
	const selectedTopics = useSelector<AppState, CaseTopic[]>((state) => state.session.selectedTopics);
	const isMonetizationEnabled = useSelector<AppState, boolean>((state) => state.features.enableMonetization);
	const selectedTemplate = useSelector<AppState, Template>((state) => state.session.selectedTemplate);

	const isBlur = isMonetizationEnabled && selectedTopics.some(({ id }) => id === '_LET');

	const updatedTemplate = getTemplate(selectedTopics);
	const isTemplateIdDifferent = updatedTemplate?.id !== selectedTemplate?.id;
	if (isTemplateIdDifferent) {
		dispatch(updateSelectedTemplate(updatedTemplate));
	}

	const sessionDocument = useSelector<AppState, SessionDocument>((state) => state.session.sessionDocument);
	if (!sessionDocument || isTemplateIdDifferent) {
		const doc = createSessionDocument(updatedTemplate, selectedParagraphs);
		dispatch(updateSessionDocument(doc));
	}

	useEffect(() => {
		ReactGA.event({
			category: 'User',
			action: 'Letter previewed',
		});
	}, []);

	return (
		<>
			<div className="letter-preview">
				<VLcard heading="Draft letter" theme="light" counter={selectedParagraphs.length} blur={isBlur}>
					<div className="letter-preview__body">
						<SessionDocComponents sessionDocumentComponents={sessionDocument?.sessionDocumentComponents} />
					</div>
				</VLcard>
			</div>
		</>
	);
};

export default DocumentPreview;
