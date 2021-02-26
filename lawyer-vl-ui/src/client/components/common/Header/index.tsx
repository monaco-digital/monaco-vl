import React, { FC, useState } from 'react'
import classNames from 'classnames'
import logo from '../../../assets/img/vl-logo-2.png'
import { NavLink } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { removeLastAnsweredQuestion } from '../../../../data/sessionDataSlice'
import AppState from '../../../../data/AppState'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { Question as QuestionT } from '../../../../types/Questions'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import useViewport from '../../../utils/useViewport'

const Header: FC = () => {
	const { isMobile } = useViewport()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)

	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions)

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)
	const [menuIsVisibile, setMenuIsVisibile] = useState(false)

	const dispatch = useDispatch()

	const navigateToTopics = () => {
		dispatch(removeLastAnsweredQuestion(null))
	}

	const headerBreacrumbClasses = classNames('header__breadcrumb', {
		'header__breadcrumb--mobile-visible': menuIsVisibile,
	})

	const handleOnClick = () => {
		setMenuIsVisibile(menuIsVisibile => !menuIsVisibile)
	}

	const keyFacts = isMobile ? 'Details' : 'Key facts'
	const previewLetter = isMobile ? 'Preview' : 'Preview your letter'

	return (
		<div className="header">
			<a href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile" target="_blank">
				<img alt="Virtual lawyer" src={logo} />
			</a>
			<div className="header__breadcrumb">
				<NavLink
					to="/questions"
					className="header__breadcrumb__text"
					activeClassName="header__breadcrumb__text-selected"
					onClick={navigateToTopics}
				>
					{keyFacts}
				</NavLink>
				<NavLink to="/preview" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					{previewLetter}
				</NavLink>
				<NavLink to="/help" className="header__breadcrumb__text" activeClassName="header__breadcrumb__text-selected">
					Help
				</NavLink>
			</div>
			<button className="header__burger-btn" onClick={handleOnClick}>
				<i className="fas fa-bars"></i>
			</button>
		</div>
	)
}

export default Header
