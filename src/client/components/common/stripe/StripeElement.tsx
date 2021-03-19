import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import config from '../../../../config';

const promise = loadStripe(config.STRIPE_PUBLIC_KEY);

interface Props {
	children: React.ReactNode;
}

export const StripeElement: React.FC<Props> = ({ children }: Props) => <Elements stripe={promise}>{children}</Elements>;
