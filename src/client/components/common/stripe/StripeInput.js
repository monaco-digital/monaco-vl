import React, { useRef, useImperativeHandle } from 'react'

// Copied from https://github.com/angeloron/react-material-ui-stripe-payment-form/
const StripeInput = ({ component: Component, inputRef, ...other }) => {
	const elementRef = useRef()
	useImperativeHandle(inputRef, () => ({
		focus: () => elementRef.current.focus,
	}))

	return <Component options={{ placeholder: '' }} onReady={element => (elementRef.current = element)} {...other} />
}

export default StripeInput
