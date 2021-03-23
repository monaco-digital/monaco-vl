import { Paragraph, TemplateParagraph } from '@monaco-digital/vl-types/lib/main';
import { saveAs } from 'file-saver';
import store from '../data/store';
import { SessionParagraph } from '../types/SessionDocument';

const extractParagraph = (sessionParagraph: SessionParagraph): Paragraph => {
	const { templateComponent } = sessionParagraph;
	const templateParagraph = templateComponent as TemplateParagraph;
	const { paragraph } = templateParagraph;
	return paragraph;
};

export const downloadDataForDS = async () => {
	const state = store.getState();
	const { selectedTopics, suggestedParagraphs: sessionParagraphs } = state.session;
	const suggestedParagraphs = sessionParagraphs.map(sessionParagraph => extractParagraph(sessionParagraph));
	const data = {
		selectedTopics,
		suggestedParagraphs,
	};
	const vlDataJson = JSON.stringify(data);
	const blob = new Blob([vlDataJson], { type: 'text/plain;charset=utf-8' });
	saveAs(blob, 'vlData.json');
};
