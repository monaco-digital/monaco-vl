import React from 'react'
import { StripeElement } from '../stripe/StripeElement'
import { CheckoutForm } from '../stripe/CheckoutForm'

export const PaymentForm: React.FC = props => {
	return (
		<StripeElement>
			<CheckoutForm />
		</StripeElement>
	)
}
