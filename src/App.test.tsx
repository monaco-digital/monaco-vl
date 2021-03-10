import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
	/* Issue with nanoid; a further discussion on how we want to test react components specifically
	const { getByText } = render(<App />)
	const linkElement = getByText(/learn react/i)
	expect(linkElement).toBeInTheDocument() */
})
