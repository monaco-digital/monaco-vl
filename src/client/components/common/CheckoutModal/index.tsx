import React, { FC } from 'react';
import { useHistory, useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import EmailModal from '../EmailModal';
import EmailComplete from '../EmailModal/EmailComplete';
import { CDF1 } from '../UserData/CDF1';
import CDFComplete from '../UserData/CDFComplete';

const CheckoutModal: FC = () => {
	const history = useHistory();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const isCheckout = Boolean(useRouteMatch('/preview/:type/checkout'));

	const { type } = useParams();

	const handleClose = () => {
		history.replace(`/preview/${type}`);
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
					<Route path="/preview/:type/checkout/email/complete">
						<EmailComplete previewType={type} />
					</Route>
					<Route path="/preview/:type/checkout/email/">
						<EmailModal previewType={type} />
					</Route>
					<Route path="/preview/:type/checkout/cdf1/complete">
						<CDFComplete previewType={type} isFinalStep={false} />
					</Route>
					<Route path="/preview/:type/checkout/cdf1">
						<CDF1 previewType={type} />
					</Route>
				</Switch>
			</div>
		</Dialog>
	);
};

export default CheckoutModal;
