import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import expandTextIcon from '../../../assets/img/expand-text-icon.svg';

type VLCardProps = {
	children: ReactNode;
	theme?: 'light' | 'dark';
	heading: string;
	counter?: number;
};

const VLcard: FC<VLCardProps> = ({ children, heading, counter, theme }: VLCardProps) => {
	const VLCardClasses = classNames('vl-card', {
		[`vl-card--${theme}`]: theme,
	});

	return (
		<div className={VLCardClasses}>
			<div className="vl-card__header">
				<span className="vl-card__header__title">{heading}</span>
				{counter !== undefined && (
					<span className="vl-card__header__counter">
						<img src={expandTextIcon} alt="Expand Text" />
						<span className="vl-card__header__counter-number">{counter}</span>
					</span>
				)}
			</div>
			<div>{children}</div>
		</div>
	);
};

VLcard.defaultProps = {
	theme: 'light',
	counter: undefined,
};

export default VLcard;
