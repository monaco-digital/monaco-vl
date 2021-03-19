import React, { FC } from 'react';
import ReactModal from 'react-modal';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import EmailModal from '../EmailModal';
import Upsell from '../Payment/Upsell';
import PaymentComplete from '../Payment/PaymentComplete';
import EmailComplete from '../EmailModal/EmailComplete';
import { PaymentForm } from '../Payment/PaymentForm';

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
};

const CheckoutModal: FC = () => {
	const history = useHistory();
	const isCheckout = Boolean(useRouteMatch('/preview/checkout'));
	const onClose = () => {
		history.push('/preview');
	};

	return (
		<ReactModal isOpen={isCheckout} shouldCloseOnOverlayClick onRequestClose={onClose} style={customStyles}>
			<div className="checkoutModal">
				<div className="checkoutModal__close-button">
					<IconButton aria-label="cancel" onClick={() => history.push('/preview')}>
						<CancelOutlinedIcon />
					</IconButton>
				</div>
				<Switch>
					<Route path="/preview/checkout/email/complete">
						<EmailComplete />
					</Route>
					<Route path="/preview/checkout/email">
						<EmailModal />
					</Route>
					<Route path="/preview/checkout/payment/complete">
						<PaymentComplete />
					</Route>
					<Route path="/preview/checkout/payment">
						<PaymentForm />
					</Route>
					<Route path="/preview/checkout">
						<Upsell />
					</Route>
				</Switch>
			</div>
		</ReactModal>
	);
};

export default CheckoutModal;
