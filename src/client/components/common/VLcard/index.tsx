import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
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

	return (
		<div className={VLCardClasses}>
			<div className="vl-card__header">
				<span className="vl-card__header__title">{heading}</span>
			</div>
			<div className={enableSelect ? 'vl-card__enable-select' : ''}>{children}</div>
		</div>
	);
};

VLcard.defaultProps = {
	theme: 'light',
};

export default VLcard;
