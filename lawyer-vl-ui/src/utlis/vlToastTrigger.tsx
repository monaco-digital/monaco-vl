import { toast, TypeOptions } from 'react-toastify'
import React from 'react'

type VlToastTriggerProps = {
	type?: TypeOptions
	text: string
}

const vlToastTrigger = ({ type = 'success', text }: VlToastTriggerProps) => {
	toast(
		() => (
			<>
				<div className="vl-toast__icon"></div>
				<div className="vl-toast__text">{text}</div>
			</>
		),
		{
			type,
			className: 'vl-toast',
			position: 'bottom-right',
			progressClassName: 'vl-toast__progress',
			autoClose: 100000,
		}
	)
}

export default vlToastTrigger
