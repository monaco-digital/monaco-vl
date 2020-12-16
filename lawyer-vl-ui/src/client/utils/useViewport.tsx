import React, { useState, useLayoutEffect } from 'react'

const useViewport = () => {
	const [width, setWidth] = useState(window.innerWidth)

	useLayoutEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth)
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	return {
		isDesktop: width > 767,
		isTablet: width <= 767 && width >= 479,
		isMobile: width < 478,
	}
}

export default useViewport
