import React, { FC, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

import logo1 from '../../../assets/img/ms-logo-blue-black.svg';

const Header: FC = () => {
	const { pathname } = useLocation();
	const [menuIsVisible, setMenuIsVisible] = useState(false);
	const history = useHistory();

	const goToCDF = () => {
		history.push('/cdf/form');
	};

	return (
		<div className="header" data-testid="header-component">
			<a href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile" target="_blank" rel="noreferrer">
				<img className="header__logo-1" alt="Monaco Solicitors" src={logo1} />
			</a>
			<div className="header__breadcrumb">
				<NavLink to="/help" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Help
				</NavLink>
				<NavLink to="/terms" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Terms of Use
				</NavLink>
				<Button variant="contained" className="header__breadcrumb__text" color="primary" onClick={goToCDF}>
					Get representation
				</Button>
			</div>
			<button className="header__burger-btn" onClick={() => setMenuIsVisible(true)} type="button">
				<i className="fas fa-bars" />
			</button>
			<Drawer open={menuIsVisible} onClose={() => setMenuIsVisible(false)}>
				<List component="nav">
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
					<ListItem button component={NavLink} to="/cdf/form" onClick={() => setMenuIsVisible(false)}>
						<ListItemText primary="Get representation" />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default Header;
