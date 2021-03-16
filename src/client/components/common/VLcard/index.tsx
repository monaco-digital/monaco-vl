import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import expandTextIcon from '../../../assets/img/expand-text-icon.svg'

type VLCardProps = {
	children: ReactNode
	theme?: 'light' | 'dark'
	heading: string
	counter?: number
	blur?: boolean
}

const VLcard: FC<VLCardProps> = ({ children, heading, counter, theme, blur }: VLCardProps) => {
	const VLCardClasses = classNames('vl-card', {
		[`vl-card--${theme}`]: theme,
	})

	return (
		<div className={VLCardClasses}>
			<div className="vl-card__header">
				<span className="vl-card__header__title">{heading}</span>
				{counter !== undefined && (
					<span className="vl-card__header__counter">
						<img src={expandTextIcon} />
						<span className="vl-card__header__counter-number">{counter}</span>
					</span>
				)}
			</div>
			<div className={blur ? 'vl-card__blur' : ''}>{children}</div>
		</div>
	)
}

export default VLcard
