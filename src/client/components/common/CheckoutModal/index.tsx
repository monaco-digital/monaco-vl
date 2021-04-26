import React, { FC, useEffect, useState } from 'react';
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import EmailModal from '../EmailModal';
import Upsell from '../Payment/Upsell';
import PaymentComplete from '../Payment/PaymentComplete';
import EmailComplete from '../EmailModal/EmailComplete';
import { PaymentForm } from '../Payment/PaymentForm';
import { CDF1 } from '../UserData/CDF1';
import CDFComplete from '../UserData/CDFComplete';

const CheckoutModal: FC = () => {
	const history = useHistory();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isCheckout = Boolean(useRouteMatch('/preview/checkout'));

	const [previewType, setPreviewType] = useState('');

	const handleClose = () => {
		history.push(`/preview/${previewType}`);
	};

	return (
		<Dialog
			fullScreen={fullScreen}
			open={isCheckout}
			aria-labelledby="checkout-modal"
			maxWidth="md"
			onClose={handleClose}
		>
			<div className="checkoutModal p-5">
				<div className="checkoutModal__close-button">
					<IconButton aria-label="cancel" onClick={handleClose}>
						<CancelOutlinedIcon />
					</IconButton>
				</div>
				<Switch>
					<Route path="/preview/checkout/email/complete/_ADV">
						{setPreviewType('_ADV')}
						<EmailComplete previewType={previewType} />
					</Route>
					<Route path="/preview/checkout/email/complete/_WP">
						{setPreviewType('_WP')}
						<EmailComplete previewType={previewType} />
					</Route>
					<Route path="/preview/checkout/email/complete">
						<EmailComplete />
					</Route>
					<Route path="/preview/checkout/email/_ADV">
						{setPreviewType('_ADV')}
						<EmailModal previewType={previewType} />
					</Route>
					<Route path="/preview/checkout/email/_WP">
						{setPreviewType('_WP')}
						<EmailModal previewType={previewType} />
					</Route>
					<Route path="/preview/checkout/email">
						<EmailModal />
					</Route>
					<Route path="/preview/checkout/cdf1/complete">
						<CDFComplete />
					</Route>
					<Route path="/preview/checkout/cdf1">
						<CDF1 />
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
		</Dialog>
	);
};

export default CheckoutModal;
