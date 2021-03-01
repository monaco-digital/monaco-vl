import React, { FC } from 'react'
import ReactModal from 'react-modal'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'
import EmailModal from '../EmailModal'
import Button from '../../Button'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		padding: '50px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}

const CheckoutModal: FC = () => {
	const history = useHistory()
	const isCheckout = Boolean(useRouteMatch('/preview/checkout'))
	const onClose = () => {
		history.push('/preview')
	}

	return (
		<ReactModal isOpen={isCheckout} shouldCloseOnOverlayClick={true} onRequestClose={onClose} style={customStyles}>
			<Switch>
				<Route path="/preview/checkout/email/complete">Email Sent</Route>
				<Route path="/preview/checkout/email">
					<EmailModal />
				</Route>
				<Route path="/preview/checkout/payment/complete">Payment Received</Route>
				<Route path="/preview/checkout/payment">
					<Button
						type="secondary"
						text="Send Payment"
						rounded
						fn={() => history.push('/preview/checkout/payment/complete')}
					></Button>
				</Route>
				<Route path="/preview/checkout">
					<Button type="secondary" text="Pay" rounded fn={() => history.push('/preview/checkout/payment')}></Button>
					<Button
						type="secondary"
						text="Just Email"
						rounded
						fn={() => history.push('/preview/checkout/email')}
					></Button>
				</Route>
			</Switch>
		</ReactModal>
	)
}

export default CheckoutModal
