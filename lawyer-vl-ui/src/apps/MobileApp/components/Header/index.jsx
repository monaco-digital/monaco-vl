import React from 'react'
import logo from './../../../../img/monaco-solicitors-logo.svg'

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<a
					href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile"
					target="_blank"
				>
					<img className="header__logo" src={logo} />
				</a>
			</div>
		</header>
	)
}

export default Header
