import { screen } from '@testing-library/react';
import { disableFeature, enableFeature } from 'data/featureDataSlice';
import React from 'react';
import { renderWithProviders } from 'testing/utils.test';
import Main from '.';

jest.mock('../components/common/Header', () => () => {
	return 'Header';
});

jest.mock('../components/common/Questions', () => () => {
	return 'Questions';
});

jest.mock('client/components/common/Narrative', () => () => {
	return 'Narrative';
});

jest.mock('../components/common/StatementSelect', () => () => {
	return 'StatementSelect';
});

jest.mock('../components/common/AdvicePreview', () => () => {
	return 'AdvicePreview';
});

jest.mock('../components/common/DocumentPreview', () => () => {
	return 'DocumentPreview';
});

jest.mock('./Terms', () => () => {
	return 'Terms';
});

jest.mock('./Help', () => () => {
	return 'Help';
});

jest.mock('./GetStarted', () => () => {
	return 'GetStarted';
});

jest.mock('../components/common/CheckoutModal', () => () => {
	return 'CheckoutModal';
});

describe('Main Component', () => {
	let initialState;

	beforeEach(() => {
		initialState = {
			session: { selectedTopics: [] },
			features: {},
		};
	});

	test('When Loading Main Then Component renders', () => {
		renderWithProviders(<Main />, { initialState });
	});

	test.each`
		url             | component
		${'/help'}      | ${'Help'}
		${'/'}          | ${'GetStarted'}
		${'/terms'}     | ${'Terms'}
		${'/questions'} | ${'Questions'}
	`('When loading $url Then $component is rendered', async ({ url, component }) => {
		renderWithProviders(<Main />, { initialState, startPage: url });

		expect(await screen.findByText(component)).toBeInTheDocument();
	});

	test('Given narrative enabled When loading /statements Then Narrative is rendered', async () => {
		initialState.features.enableNarrative = true;
		renderWithProviders(<Main />, { initialState, startPage: 'statements' });

		expect(await screen.findByText('Narrative')).toBeInTheDocument();
	});

	test('Given narrative disabled When loading /statements Then StatementSelect is rendered', async () => {
		initialState.features.enableNarrative = false;
		renderWithProviders(<Main />, { initialState, startPage: 'statements' });

		expect(await screen.findByText('StatementSelect')).toBeInTheDocument();
	});

	test.each`
		feature                 | alias
		${'enableNarrative'}    | ${'enableNarrative'}
		${'enableNarrative'}    | ${'fn'}
		${'enableMonetization'} | ${'enableMonetization'}
		${'enableMonetization'} | ${'fm'}
	`('When $alias true Then enable $feature is dispatched', ({ feature, alias }) => {
		const { store } = renderWithProviders(<Main />, { initialState, startPage: `/?${alias}=true` });

		const actions = store.getActions();

		expect(actions[0]).toEqual(enableFeature(feature));
	});

	test.each`
		feature                 | alias
		${'enableNarrative'}    | ${'enableNarrative'}
		${'enableMonetization'} | ${'enableMonetization'}
	`('When $alias false Then disable $feature is dispatched', ({ feature, alias }) => {
		const { store } = renderWithProviders(<Main />, { initialState, startPage: `/?${alias}=false` });

		const actions = store.getActions();

		expect(actions[0]).toEqual(disableFeature(feature));
	});

	test('When source = lac Then disableMonetization is dispatched', () => {
		const { store } = renderWithProviders(<Main />, { initialState, startPage: `/?source=lac` });

		const actions = store.getActions();

		expect(actions[0]).toEqual(disableFeature('enableMonetization'));
	});

	test.each`
		feature
		${'enableNarrative'}
		${'enableMonetization'}
	`('When $feature set in localstorage Then enable $feature is dispatched', ({ feature }) => {
		const local = {};
		local[feature] = true;
		(localStorage.getItem as jest.Mock<any, any>).mockReturnValue(JSON.stringify(local));

		const { store } = renderWithProviders(<Main />, { initialState, startPage: `/` });

		const actions = store.getActions();

		expect(actions[0]).toEqual(enableFeature(feature));
	});

	test.each`
		feature
		${'enableNarrative'}
		${'enableMonetization'}
	`('When $feature set false in localstorage Then disable $feature is dispatched', ({ feature }) => {
		const local = {};
		local[feature] = false;
		(localStorage.getItem as jest.Mock<any, any>).mockReturnValue(JSON.stringify(local));

		const { store } = renderWithProviders(<Main />, { initialState, startPage: `/` });

		const actions = store.getActions();

		expect(actions[0]).toEqual(disableFeature(feature));
	});
});
