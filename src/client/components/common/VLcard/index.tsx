import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import AppState from '../../../../data/AppState';

type VLCardProps = {
	children: ReactNode;
	theme?: 'light' | 'dark';
	heading: string;
};

const VLcard: FC<VLCardProps> = ({ children, heading, theme }: VLCardProps) => {
	const enableSelect = useSelector<AppState, boolean>(state => state.features.enableSelect);

	const VLCardClasses = classNames('vl-card', {
		[`vl-card--${theme}`]: theme,
	});

	const history = useHistory();
	const { id = '_ADV' } = useParams();

	const openCheckoutModal = () => {
		history.replace(`/preview/${id}/checkout/email`);
	};

	return (
		<div className={VLCardClasses}>
			<div className="vl-card__header">
				<span className="vl-card__header__title">{heading}</span>
				<div className="vl-card__actions">
					<Fab variant="extended" color="primary" onClick={openCheckoutModal}>
						<GetApp />
						<div className="vl-card__email_button_text">&nbsp;Email</div>
					</Fab>
				</div>
			</div>
			<div className={enableSelect ? 'vl-card__enable-select' : ''}>{children}</div>
		</div>
	);
};

VLcard.defaultProps = {
	theme: 'light',
};

export default VLcard;
