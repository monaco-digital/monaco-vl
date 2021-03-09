import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import config from '../../../../config'
const promise = loadStripe(config.STRIPE_PUBLIC_KEY)

export const StripeElement: React.FC = props => {
	const { children } = props
	return <Elements stripe={promise}>{children}</Elements>
}
