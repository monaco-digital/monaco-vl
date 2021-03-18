import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'

import { createWPLetterPaymentRequest } from '../../../../api/vl/stripe'
import { Button, CircularProgress, TextField, Typography, Grid, Checkbox, FormHelperText } from '@material-ui/core'
import { submitDetails } from '../../../../api/general'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { SessionDocument } from '../../../../types/SessionDocument'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs'
import { getDocumentText } from '../../../../utils/renderDocument'
import StripeInput from './StripeInput'

const makeCallToSubmitDetails = async (input: {
	name: string
	recipient: string
	sessionDocument: any
	selectedTopics: any
}): Promise<void> => {
	const { name, recipient, sessionDocument, selectedTopics } = input

	const adviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics)

	const getLetterText = (): string => {
		const letterText = sessionDocument && sessionDocument.document && getDocumentText(sessionDocument.document)
		return letterText
	}

	const getTopicsList = (): string => {
		const topicsList = selectedTopics.map(t => t.text).join(', ')
		return topicsList
	}

	const getAdviceText = (): string => {
		const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n\n')
		return adviceText
	}

	const data = {
		name,
		recipient,
		adviceText: getAdviceText(),
		letterText: getLetterText(),
		topicsList: getTopicsList(),
		templateId: 'GE1',
	}
	submitDetails(data)
}

export const CheckoutForm: React.FC = () => {
	//todo - take out of here - data for submit details call

	const sessionDocument = useSelector<AppState, SessionDocument>(state => state.session.sessionDocument)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)

	const { register, handleSubmit, errors } = useForm()

	const [succeeded, setSucceeded] = useState(false)
	const [error, setError] = useState(null)
	const [processing, setProcessing] = useState(false)
	const stripe = useStripe()
	const elements = useElements()

	const history = useHistory()
	const handleChange = async (event): Promise<void> => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setError(event.error ? event.error.message : '')
	}

	const onSubmit = async (data): Promise<void> => {
		setProcessing(true)
		const clientSecret = await createWPLetterPaymentRequest(data.email)
		const payload = await stripe.confirmCardPayment(clientSecret, {
			// justification: 3rd party API library
			// eslint-disable-next-line @typescript-eslint/camelcase
			payment_method: {
				card: elements.getElement(CardNumberElement),
			},
		})
		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`)
			setProcessing(false)
		} else {
			setError(null)
			setProcessing(false)
			setSucceeded(true)
			history.push('/preview/checkout/payment/complete')
			//make call to submit details
			await makeCallToSubmitDetails({
				name: data.name,
				recipient: data.email,
				sessionDocument,
				selectedTopics,
			})
		}
	}

	return (
		<form id="payment-form" noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 max-w-xs">
			<Typography className="self-center" variant="h5">
				Checkout
			</Typography>
			<p>You are buying a legal letter template which you can adapt and send to your employer</p>
			<TextField
				name="email"
				label="Email"
				required
				inputRef={register({ required: 'Email is required' })}
				fullWidth
				error={Boolean(errors.email)}
				helperText={errors.email?.message}
				variant="filled"
			/>
			<TextField
				name="name"
				label="Name on card"
				required
				inputRef={register({ required: 'Name on card is required' })}
				error={Boolean(errors.name)}
				helperText={errors.name?.message}
				fullWidth
				variant="filled"
			/>
			<TextField
				label="Credit Card Number"
				name="ccnumber"
				required
				fullWidth
				InputProps={{
					inputComponent: StripeInput,
					inputProps: {
						component: CardNumberElement,
					},
				}}
				onChange={handleChange}
				InputLabelProps={{ shrink: true }}
				variant="filled"
			/>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						label="Expiration Date"
						name="ccexp"
						required
						fullWidth
						InputProps={{
							inputProps: {
								component: CardExpiryElement,
							},
							inputComponent: StripeInput,
						}}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
						variant="filled"
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label="CVC"
						name="cvc"
						required
						fullWidth
						InputProps={{
							inputProps: {
								component: CardCvcElement,
							},
							inputComponent: StripeInput,
						}}
						onChange={handleChange}
						InputLabelProps={{ shrink: true }}
						variant="filled"
					/>
				</Grid>
			</Grid>
			{error && <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
			<Grid>
				<Checkbox
					name="termsAccepted"
					color="primary"
					inputRef={register({ required: 'You must accept the terms and conditions' })}
				/>
				<span>
					Agree to our{' '}
					<Link to="/terms" className="text-ms-orange" target="_blank">
						Terms and Conditions
					</Link>
				</span>
			</Grid>
			{errors.termsAccepted && (
				<FormHelperText error={Boolean(errors.termsAccepted)}>{errors.termsAccepted?.message}</FormHelperText>
			)}

			<Grid container dir="row" spacing={2}>
				<Grid item xs={6}>
					<Button
						disabled={processing || succeeded}
						type="submit"
						variant="contained"
						size="large"
						color="secondary"
						fullWidth
					>
						<>
							{processing && <CircularProgress size={30} thickness={5} style={{ color: 'white' }} />}
							{!processing && <span>Buy now</span>}
						</>
					</Button>
				</Grid>
				<Grid item className="self-end">
					<Typography variant="h6" className="underline">
						for just £5
					</Typography>
				</Grid>
			</Grid>
		</form>
	)
}
