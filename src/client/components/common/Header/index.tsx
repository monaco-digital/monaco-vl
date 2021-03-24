import React, { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import config from '../../../../config/index';

import logo2 from '../../../assets/img/vl-powered-by-logo-01.svg';
import logo1 from '../../../assets/img/ms-logo-blue-black.svg';
import { removeLastAnsweredQuestion } from '../../../../data/sessionDataSlice';

const { VL_URL } = config;

const Header: FC = () => {
	const { pathname } = useLocation();
	const [menuIsVisible, setMenuIsVisible] = useState(false);
	const dispatch = useDispatch();

	const navigateToTopics = () => {
		dispatch(removeLastAnsweredQuestion());
		setMenuIsVisible(false);
	};

	return (
		<div className="header">
			<a href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile" target="_blank" rel="noreferrer">
				<img className="header__logo-1" alt="Virtual lawyer" src={logo1} />
			</a>
			<a href={VL_URL} target="_blank" rel="noreferrer">
				<img className="header__logo-2" alt="Virtual lawyer" src={logo2} />
			</a>
			<div className="header__breadcrumb">
				<NavLink
					to="/questions"
					className="header__breadcrumb__text"
					activeClassName="header__breadcrumb__text-selected"
					onClick={navigateToTopics}
				>
					Key facts
				</NavLink>
				<NavLink to="/preview" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Preview your letter
				</NavLink>
				<NavLink to="/help" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Help
				</NavLink>
				<NavLink to="/terms" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Terms of Use
				</NavLink>
			</div>
			<button className="header__burger-btn" onClick={() => setMenuIsVisible(true)} type="button">
				<i className="fas fa-bars" />
			</button>
			<Drawer open={menuIsVisible} onClose={() => setMenuIsVisible(false)}>
				<List component="nav">
					<ListItem
						button
						component={NavLink}
						to="/questions"
						onClick={navigateToTopics}
						selected={pathname === '/questions'}
					>
						<ListItemText primary="Key facts" />
					</ListItem>
					<ListItem
						button
						component={NavLink}
						to="/preview"
						onClick={() => setMenuIsVisible(false)}
						selected={pathname === '/preview'}
					>
						<ListItemText primary="Preview your letter" />
					</ListItem>
					<ListItem
						button
						component={NavLink}
						to="/help"
						onClick={() => setMenuIsVisible(false)}
						selected={pathname === '/help'}
					>
						<ListItemText primary="Help" />
					</ListItem>
					<ListItem
						button
						component={NavLink}
						to="/terms"
						onClick={() => setMenuIsVisible(false)}
						selected={pathname === '/terms'}
					>
						<ListItemText primary="Terms of Use" />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default Header;
