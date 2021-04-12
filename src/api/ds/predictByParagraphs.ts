import { Paragraph, StaticText } from 'api/vl/models';
import axios from 'axios';
import { groupBy } from 'lodash';
import { PredictRequest } from './models';

const getParagraphText = (paragraph: Paragraph): string => {
	return paragraph.paragraphComponents
		.filter(pc => pc.type === 'StaticText')
		.map(p => (p as StaticText).textFirstPerson)
		.join(' ');
};

const predictParagraphFromParagraphs = async (narrative: string, paragraphs: Paragraph[]): Promise<string> => {
	const paraMap = paragraphs.reduce((map, p) => {
		// eslint-disable-next-line no-param-reassign
		map[p.id] = getParagraphText(p);
		return map;
	}, {});

	const request: PredictRequest = { cdf: narrative, paras: paraMap };

	try {
		const {
			data: { best_match_para_id: bestMatchParaId },
		} = await axios.post<{ best_match_para_id: string }>(`${process.env.REACT_APP_DS_PREDICT_API}/predict`, request);

		return bestMatchParaId;
	} catch (e) {
		// ignore
	}
	return null;
};

export const predictParagraphsFromParagraphs = async (
	narrative: string,
	paragraphs: Paragraph[],
): Promise<string[]> => {
	// group by primary topic
	const groups: Record<string, Paragraph[]> = groupBy(paragraphs, (p: Paragraph) => p?.topicsAllOf[0]);

	// fire seperate prediction request for all groups
	const results = await Promise.all(
		Object.values(groups).map(async paraGroup => {
			return predictParagraphFromParagraphs(narrative, paraGroup);
		}),
	);

	// filter out nulls from server errors
	return results.filter(id => id !== null);
};
