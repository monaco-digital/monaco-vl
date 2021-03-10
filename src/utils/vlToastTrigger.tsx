import { toast, TypeOptions } from 'react-toastify'
import React from 'react'
import notificationCopyIcon from '../client/assets/img/notification-copy-icon.svg'
import notificationNewDocIcon from '../client/assets/img/notification-new-doc-icon.svg'
import notificationWarningIcon from '../client/assets/img/notification-warning-icon.svg'

type VlToastTriggerProps = {
	type?: TypeOptions
	text: string
	iconType?: 'copy' | 'new-doc' | 'warning'
}

const vlToastTrigger = ({ type = 'success', text, iconType }: VlToastTriggerProps): void => {
	let icon: string | false = false

	switch (iconType) {
		case 'new-doc':
			icon = notificationNewDocIcon
			break
		case 'copy':
			icon = notificationCopyIcon
			break
		case 'warning':
			icon = notificationWarningIcon
			break
		default:
			icon = false
			break
	}

	toast(
		() => (
			<>
				{icon && (
					<div className="vl-toast__icon">
						<img src={icon} />
					</div>
				)}
				<div className="vl-toast__text">{text}</div>
			</>
		),
		{
			type,
			className: 'vl-toast',
			position: 'bottom-right',
			progressClassName: 'vl-toast__progress',
			autoClose: 3000,
		}
	)
}

export default vlToastTrigger
