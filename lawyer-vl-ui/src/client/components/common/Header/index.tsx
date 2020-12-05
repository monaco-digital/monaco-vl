import React, { FC } from 'react'
import logo from '../../../assets/img/virtual-lawyer-logo.svg'

const Header: FC = () => {
	return (
		<div className="header">
			<a
				href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile"
				target="_blank"
			>
				<img alt="Virtual lawyer" src={logo} />
			</a>
			<div className="header__breadcrumb">
				<div className="header__breadrcrumb__text">
					<button>Key Facts</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button>Build Your Letter</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button>Preview Your Letter</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button>Help</button>
				</div>
			</div>
		</div>
	)
}

export default Header
