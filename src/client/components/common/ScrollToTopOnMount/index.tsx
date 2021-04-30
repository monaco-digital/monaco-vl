import { FC, useEffect } from 'react';

/**
 * Component to scroll to the top the first time a page is loaded.
 */
const ScrollToTopOnMount: FC = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return null;
};

export default ScrollToTopOnMount;
