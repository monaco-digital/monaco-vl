import React from 'react'
import logo from '../../assets/img/virtual-lawyer-logo.svg'

const Header: React.FC = () => {
	return (
		<header className="header">
			<div className="container">
				<a
					href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile"
					target="_blank"
				>
					<img alt="Virtual lawyer" src={logo} />
				</a>
			</div>
		</header>
	)
}

export default Header
