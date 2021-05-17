import { render, RenderOptions, RenderResult, screen } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import configureStore from 'redux-mock-store'; // ES6 modules
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

export type ProviderRenderOptions = {
	startPage?: string;
	initialState?: unknown;
};

export interface ProviderRenderResult extends RenderResult {
	history: MemoryHistory;
	// Cant find exported type for mock store
	store: any;
}

const theme = createMuiTheme();

/**
 * Test util function to setup common providers during a react testing library test.
 */
export const renderWithProviders = (
	ui: ReactElement,
	providerOptions?: ProviderRenderOptions,
	options?: Omit<RenderOptions, 'queries'>,
): ProviderRenderResult => {
	const history = createMemoryHistory();
	if (providerOptions?.startPage) {
		history.push(providerOptions.startPage);
	}

	const store = mockStore(providerOptions?.initialState);

	const utils = render(ui, {
		wrapper: ({ children }: { children: ReactNode }) => (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router history={history}>{children}</Router>
				</ThemeProvider>
			</Provider>
		),
		...options,
	});

	return {
		history,
		store,
		...utils,
	};
};

test('renderWithProviders renders correctly', () => {
	renderWithProviders(<div>Test Component</div>);

	expect(screen.getByText('Test Component')).toBeInTheDocument();
});
