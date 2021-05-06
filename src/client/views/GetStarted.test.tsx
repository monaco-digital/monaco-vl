import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';

import GetStarted from './GetStarted';
import { renderWithProviders } from '../../testing/utils.test';

// eslint-disable-next-line
declare var richSnippetReviewsWidgets;

describe('Get Started Page', () => {
	beforeEach(() => {
		Object.defineProperty(global, 'richSnippetReviewsWidgets', { value: jest.fn(), writable: true });
	});

	test('When loading GetStarted Then Page renders', () => {
		renderWithProviders(<GetStarted />);

		expect(screen.getAllByText('Advice to exit package in 4 easy steps')[0]).toBeInTheDocument();
	});

	test('When clicking get started Then questions page loads', () => {
		const { history } = renderWithProviders(<GetStarted />);

		userEvent.click(screen.getAllByText('Get Started')[0]);

		expect(history.location.pathname).toEqual('/questions');
	});

	test('Five Get Started buttons render', () => {
		renderWithProviders(<GetStarted />);

		expect(screen.getAllByText('Get Started').length).toEqual(4);
	});

	test('When loading the richSnippetReviewsWidgets function is called', () => {
		renderWithProviders(<GetStarted />);

		expect(richSnippetReviewsWidgets).toHaveBeenCalled();
	});
});
