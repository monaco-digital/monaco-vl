import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'

import { createWPLetterPaymentRequest } from '../../../../api/vl/stripe'
import {
	Button,
	CircularProgress,
	TextField,
	Typography,
	Grid,
	FormControlLabel,
	Checkbox,
	FormHelperText,
} from '@material-ui/core'
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
}) => {
	const { name, recipient, sessionDocument, selectedTopics } = input

	const adviceParagraphs = await getSuggestedAdviceParagraphs(selectedTopics)

	const getLetterText = () => {
		const letterText = sessionDocument && sessionDocument.document && getDocumentText(sessionDocument.document)
		return letterText
	}

	const getTopicsList = () => {
		const topicsList = selectedTopics.map(t => t.text).join(', ')
		return topicsList
	}

	const getAdviceText = () => {
		const adviceText = adviceParagraphs.map(ap => ap.text).join('\n\n\n')
		return adviceText
	}

	const data = {
		name,
		recipient,
		adviceText: getAdviceText(),
		letterText: getLetterText(),
		topicsList: getTopicsList(),
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
	const [disabled, setDisabled] = useState(true)
	const stripe = useStripe()
	const elements = useElements()

	const history = useHistory()
	const handleChange = async event => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty)
		setError(event.error ? event.error.message : '')
	}

	const onSubmit = async data => {
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
		<form id="payment-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6 max-w-sm">
			<Typography className="self-center" variant="h5">
				Checkout
			</Typography>
			<p>You are buying a legal letter template which you can adapt and send to your employer</p>
			<TextField
				name="email"
				label="Email"
				inputRef={register({ required: 'Email is required' })}
				fullWidth
				error={Boolean(errors.email)}
				helperText={errors.email?.message}
			/>
			<TextField
				name="name"
				label="Name on card"
				inputRef={register({ required: 'Name on card is required' })}
				error={Boolean(errors.name)}
				helperText={errors.name?.message}
				fullWidth
			/>
			<TextField
				label="Credit Card Number"
				name="ccnumber"
				fullWidth
				InputProps={{
					inputComponent: StripeInput,
					inputProps: {
						component: CardNumberElement,
					},
				}}
				onChange={handleChange}
			/>

			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						label="Expiration Date"
						name="ccexp"
						fullWidth
						InputProps={{
							inputProps: {
								component: CardExpiryElement,
							},
							inputComponent: StripeInput,
						}}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label="CVC"
						name="cvc"
						fullWidth
						InputProps={{
							inputProps: {
								component: CardCvcElement,
							},
							inputComponent: StripeInput,
						}}
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			{error && <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
			<FormControlLabel
				name="termsAccepted"
				control={
					<Checkbox color="primary" inputRef={register({ required: 'You must accept the terms and conditions' })} />
				}
				label={<div>Agree to our Terms and Conditions</div>}
			/>
			{errors.termsAccepted && (
				<FormHelperText error={Boolean(errors.termsAccepted)}>{errors.termsAccepted?.message}</FormHelperText>
			)}

			<Grid container dir="row" spacing={2} justify="flex-end">
				<Grid item>
					<Button
						disabled={processing || disabled || succeeded}
						type="submit"
						variant="contained"
						size="large"
						color="secondary"
					>
						<>
							{processing && <CircularProgress size={30} thickness={5} style={{ color: 'white' }} />}
							{!processing && <span>Buy now</span>}
						</>
					</Button>
				</Grid>
				<Grid item className="self-end">
					for just £5
				</Grid>
			</Grid>
		</form>
	)
}
