import { CaseTopic, Paragraph, Template } from '@monaco-digital/vl-types/lib/main';
import { Question } from '../types/Questions';
import { SessionDocument, SessionParagraph } from '../types/SessionDocument';
import { ParagraphToggle } from '../types/paragraph';

type AppState = {
	session: {
		suggestedParagraphs: SessionParagraph[];
		selectedTopics: CaseTopic[];
		answeredQuestions: Question[];
		selectedTemplate: Template;
		sessionDocument: SessionDocument;
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
	};
};

export default AppState;
