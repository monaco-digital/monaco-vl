import { StaticText } from 'api/vl/models';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { PredictRequest } from './models';
import { predictParagraphsFromParagraphs } from './predictByParagraphs';

const mock = new MockAdapter(axios);

const para1 = {
	id: 'phAhcMpzcaKlJLxJeXQok-PAR1',
	summary: 'I have been bullied',
	verticalHeight: 2,
	topic: '() + allOf(B,E) + !(D)',
	status: 'Live',
	topicsOneOf: [],
	topicsAllOf: ['B', 'E'],
	topicsNoneOf: ['D'],
	isAutomaticallyIncluded: false,
	paragraphComponents: [
		{
			id: 'phAhcMpzcaKlJLxJeXQok-STXT-0',
			type: 'StaticText',
			textFirstPerson: 'Para 1 text',
			textThirdPerson: null,
		} as StaticText,
	],
	paragraphComponentRefs: ['phAhcMpzcaKlJLxJeXQok-STXT-0'],
};

const para2 = {
	id: 'WHIZvIYm3cVhpWa0JH-Up-PAR1',
	summary: "I've been selected for potential redundancy whilst off work because of my disability",
	verticalHeight: 6,
	topic: '() + allOf(RR,D) + !()',
	status: 'Live',
	topicsOneOf: [],
	topicsAllOf: ['RR', 'D'],
	topicsNoneOf: [],
	isAutomaticallyIncluded: false,
	paragraphComponents: [
		{
			id: 'WHIZvIYm3cVhpWa0JH-Up-STXT-0',
			type: 'StaticText',
			textFirstPerson: 'Para 2 text',
			textThirdPerson: null,
		} as StaticText,
	],
	paragraphComponentRefs: ['WHIZvIYm3cVhpWa0JH-Up-STXT-0'],
};

const para3 = {
	id: 'Para3Id',
	summary: 'Duplicate Topics',
	verticalHeight: 2,
	topic: '() + allOf(B,E) + !(D)',
	status: 'Live',
	topicsOneOf: [],
	topicsAllOf: ['B', 'E'],
	topicsNoneOf: ['D'],
	isAutomaticallyIncluded: false,
	paragraphComponents: [
		{
			id: 'para3-STXT-0',
			type: 'StaticText',
			textFirstPerson: 'Para 3 text',
			textThirdPerson: null,
		} as StaticText,
	],
	paragraphComponentRefs: ['para3-STXT-0'],
};

const multiTextPara = {
	id: 'phAhcMpzcaKlJLxJeXQok-PAR1',
	summary: 'I have been bullied',
	verticalHeight: 2,
	topic: '() + allOf(B,E) + !(D)',
	status: 'Live',
	topicsOneOf: [],
	topicsAllOf: ['B', 'E'],
	topicsNoneOf: ['D'],
	isAutomaticallyIncluded: false,
	paragraphComponents: [
		{
			id: 'phAhcMpzcaKlJLxJeXQok-STXT-0',
			type: 'StaticText',
			textFirstPerson: 'Para text part 1',
			textThirdPerson: null,
		} as StaticText,
		{
			id: 'phAhcMpzcaKlJLxJeXQok-STXT-0',
			type: 'StaticText',
			textFirstPerson: 'Para text part 2',
			textThirdPerson: null,
		} as StaticText,
	],
	paragraphComponentRefs: ['phAhcMpzcaKlJLxJeXQok-STXT-0'],
};

describe('Predict Paragraphs', () => {
	beforeEach(() => {});

	afterEach(() => {
		mock.reset();
	});

	test('When Predicting by Paragraphs Then API is called with correct info', async () => {
		mock
			.onPost(`${process.env.REACT_APP_DS_PREDICT_API}/predict`)
			.reply(200, { best_match_para_id: 'phAhcMpzcaKlJLxJeXQok-PAR1' });

		const result = await predictParagraphsFromParagraphs('narrative text', [para1]);

		expect(mock.history.post.length).toEqual(1);
		expect(mock.history.post[0].data).toEqual(
			JSON.stringify({
				cdf: 'narrative text',
				paras: {
					'phAhcMpzcaKlJLxJeXQok-PAR1': 'Para 1 text',
				},
			} as PredictRequest),
		);

		expect(result).toEqual(['phAhcMpzcaKlJLxJeXQok-PAR1']);
	});

	test('When Predicting by multiple paragraphs Then API is called twice', async () => {
		mock
			.onPost(`${process.env.REACT_APP_DS_PREDICT_API}/predict`)
			.replyOnce(200, { best_match_para_id: 'ID1' })
			.onPost(`${process.env.REACT_APP_DS_PREDICT_API}/predict`)
			.replyOnce(200, { best_match_para_id: 'ID2' });

		const result = await predictParagraphsFromParagraphs('narrative text', [para1, para2]);

		expect(mock.history.post.length).toEqual(2);
		expect(mock.history.post[0].data).toEqual(
			JSON.stringify({
				cdf: 'narrative text',
				paras: {
					'phAhcMpzcaKlJLxJeXQok-PAR1': 'Para 1 text',
				},
			} as PredictRequest),
		);
		expect(mock.history.post[1].data).toEqual(
			JSON.stringify({
				cdf: 'narrative text',
				paras: {
					'WHIZvIYm3cVhpWa0JH-Up-PAR1': 'Para 2 text',
				},
			} as PredictRequest),
		);

		expect(result).toEqual(['ID1', 'ID2']);
	});

	test('When Predicting one group paragraphs Then API is called once', async () => {
		mock.onPost(`${process.env.REACT_APP_DS_PREDICT_API}/predict`).reply(200, { best_match_para_id: 'ID1' });

		const result = await predictParagraphsFromParagraphs('narrative text', [para1, para3]);

		expect(mock.history.post.length).toEqual(1);
		expect(mock.history.post[0].data).toEqual(
			JSON.stringify({
				cdf: 'narrative text',
				paras: {
					'phAhcMpzcaKlJLxJeXQok-PAR1': 'Para 1 text',
					Para3Id: 'Para 3 text',
				},
			} as PredictRequest),
		);

		expect(result).toEqual(['ID1']);
	});

	test('Given Paragraph with multiple static text When Predicting by Paragraphs Then API is called with correct info', async () => {
		mock
			.onPost(`${process.env.REACT_APP_DS_PREDICT_API}/predict`)
			.reply(200, { best_match_para_id: 'phAhcMpzcaKlJLxJeXQok-PAR1' });

		const result = await predictParagraphsFromParagraphs('narrative text', [multiTextPara]);

		expect(mock.history.post.length).toEqual(1);
		expect(mock.history.post[0].data).toEqual(
			JSON.stringify({
				cdf: 'narrative text',
				paras: {
					'phAhcMpzcaKlJLxJeXQok-PAR1': 'Para text part 1 Para text part 2',
				},
			} as PredictRequest),
		);

		expect(result).toEqual(['phAhcMpzcaKlJLxJeXQok-PAR1']);
	});

	test('Given network error When Predicting by Paragraphs Then empty array returned', async () => {
		mock.onPost(`${process.env.REACT_APP_DS_PREDICT_API}/predict`).networkError();

		const result = await predictParagraphsFromParagraphs('narrative text', [para1]);

		expect(mock.history.post.length).toEqual(1);

		expect(result).toEqual([]);
	});
});
