import React from 'react'
import logo from '../../assets/img/virtual-lawyer-logo.svg'
import { NavView } from '../../views/Main'

interface Props {
	setView: (type: NavView) => void
}

export const Header: React.FC<Props> = (props: Props) => {
	const { setView } = props

	const chooseView = (view: NavView) => {
		switch (view) {
			case 'get-started':
				setView('key-facts')
				break
			case 'key-facts':
				setView('key-facts')
				break
			case 'preview-letter':
				setView('preview-letter')
				break
			case 'letter-builder':
				setView('letter-builder')
				break
			case 'help':
				setView('help')
				break
			default:
				setView('get-started')
				break
		}
	}

	return (
		<header className="header">
			<div className="container">
				<a
					href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile"
					target="_blank"
				>
					<img alt="Virtual lawyer" src={logo} />
				</a>
				<span onClick={() => chooseView('key-facts')}>Key Facts</span>
				<span onClick={() => chooseView('letter-builder')}>
					Build Your Letter
				</span>
				<span onClick={() => chooseView('preview-letter')}>
					Preview Your letter
				</span>
				<span onClick={() => chooseView('help')}>Help</span>
			</div>
		</header>
	)
}

export default Header
