import React, { FC } from 'react'
import logo from '../../../assets/img/virtual-lawyer-logo.svg'
import { useDispatch } from 'react-redux'
import pages from '../../../../types /navigation'
import { setPage } from '../../../../data/navigationDataSlice'
const Header: FC = () => {
	const dispatch = useDispatch()
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
					<button onClick={() => dispatch(setPage(pages.TOPICS))}>
						Key Facts
					</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button onClick={() => dispatch(setPage(pages.PARAGRAPHS_PREVIEW))}>
						Build Your Letter
					</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button onClick={() => dispatch(setPage(pages.LETTER_PREVIEW))}>
						Preview Your Letter
					</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button onClick={() => dispatch(setPage(pages.HELP))}>Help</button>
				</div>
			</div>
		</div>
	)
}

export default Header
