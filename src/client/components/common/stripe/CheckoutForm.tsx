import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import config from '../../../../config'
import { createWPLetterPaymentRequest } from '../../../../api/vl/stripe'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { submitDetails } from '../../../../api/general'
import { useSelector } from 'react-redux'
import AppState from '../../../../data/AppState'
import { SessionDocument } from '../../../../types/SessionDocument'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { getSuggestedAdviceParagraphs } from '../../../../api/vl/paragraphs'
import { getDocumentText } from '../../../../utils/renderDocument'

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

	const [email, setEmail] = useState<string>(null)
	const [name, setName] = useState<string>(null)
	const [succeeded, setSucceeded] = useState(false)
	const [error, setError] = useState(null)
	const [processing, setProcessing] = useState(false)
	const [disabled, setDisabled] = useState(true)
	const stripe = useStripe()
	const elements = useElements()

	const history = useHistory()
	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '18px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}
	const handleChange = async event => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty)
		setError(event.error ? event.error.message : '')
	}

	const handleSubmit = async ev => {
		ev.preventDefault()
		if (!email) {
			setError(`Email is required`)
			return
		}
		if (!name) {
			setError(`Name is required`)
			return
		}
		setProcessing(true)
		const clientSecret = await createWPLetterPaymentRequest(email)
		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
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
				name,
				recipient: email,
				sessionDocument,
				selectedTopics,
			})
		}
	}

	const handleEmailChange = async ev => {
		const email = ev.target.value
		if (email) {
			setEmail(email)
			setError(null)
		}
	}

	const handleNameChange = async ev => {
		const name = ev.target.value
		if (name) {
			setName(name)
			setError(null)
		}
	}

	return (
		<form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
			<div className="space-x-4" style={{ width: '100%' }}>
				<TextField
					style={{ width: '45%' }}
					id="standard-basic"
					label="Email"
					inputProps={{ style: { fontSize: 18 } }}
					InputLabelProps={{ style: { fontSize: 18 } }}
					onChange={handleEmailChange}
				/>
				<TextField
					style={{ width: '45%' }}
					id="standard-basic"
					label="Name"
					inputProps={{ style: { fontSize: 18 } }}
					InputLabelProps={{ style: { fontSize: 18 } }}
					onChange={handleNameChange}
				/>
			</div>
			<CardElement options={cardStyle} onChange={handleChange} />
			<Button
				disabled={processing || disabled || succeeded}
				type="submit"
				variant="contained"
				size="large"
				color="secondary"
				fullWidth
			>
				<>
					{processing && <CircularProgress size={30} thickness={5} style={{ color: 'white' }} />}
					{!processing && <span>Make Payment for £5.00</span>}
				</>
			</Button>
			{error && (
				<div className="card-error" role="alert">
					{error}
				</div>
			)}
		</form>
	)
}
