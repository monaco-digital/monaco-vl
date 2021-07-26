import { CaseTopic, Paragraph, Template } from 'api/vl/models';
import { SessionDocument, SessionParagraph } from '../types/SessionDocument';
import { ParagraphToggle } from '../types/paragraph';
import { UserData } from '../types/UserData';

type AppState = {
	session: {
		id: string;
		narrative: string;
		suggestedParagraphs: SessionParagraph[];
		selectedTopics: CaseTopic[];
		answeredQuestions: number[];
		selectedTemplate: Template;
		currentSessionDocument: string;
		sessionDocuments: {
			_WP: SessionDocument;
			_GR: SessionDocument;
			_ET: SessionDocument;
			_RES_CD: SessionDocument;
			_RES_CO: SessionDocument;
			_RES_I: SessionDocument;
			_RES_KM: SessionDocument;
		};
		userData: UserData;
	};
	paragraphs: {
		all: Paragraph[];
		suggested: Paragraph[];
		selected: Paragraph[];
		toggle: ParagraphToggle;
	};
	topics: {
		all: CaseTopic[];
		selected: CaseTopic[];
	};
	features: {
		enableMonetization: boolean;
		dsFlow: boolean;
		enableNarrative: boolean;
		enableSelect: boolean;
		academyFlow: boolean;
	};
};

export default AppState;
