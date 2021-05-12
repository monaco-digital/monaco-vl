import React from 'react';
import { screen } from '@testing-library/react';
import PreviewLetterExplanation from '.';
import { renderWithProviders } from '../../../../testing/utils.test';

describe('The right text gets rendered', () => {
	test('In the _WP template the right text renders', () => {
	  renderWithProviders(<PreviewLetterExplanation letter='_WP'/>);

    expect(screen.getByText('without prejudice')).toBeInTheDocument();
	});
});
