import { CaseTopic, Paragraph, Template } from 'api/vl/models';
import { Question } from '../types/Questions';
import { SessionDocument, SessionParagraph } from '../types/SessionDocument';
import { ParagraphToggle } from '../types/paragraph';
import { UserData } from '../types/UserData';

type AppState = {
	session: {
		suggestedParagraphs: SessionParagraph[];
		selectedTopics: CaseTopic[];
		answeredQuestions: Question[];
		selectedTemplate: Template;
		currentSessionDocument: string;
		currentStep: number;
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
	questions: {
		answeredQuestions: Question[];
	};
	features: {
		enableMonetization: boolean;
		dsFlow: boolean;
		enableNarrative: boolean;
		enableSelect: boolean;
	};
};

export default AppState;
