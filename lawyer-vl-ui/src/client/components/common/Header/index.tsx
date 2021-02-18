import React, { FC, useState } from 'react'
import classNames from 'classnames'
import logo from '../../../assets/img/vl-logo.png'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../../../data/navigationDataSlice'
import { removeLastAnsweredQuestion } from '../../../../data/sessionDataSlice'
import pages from '../../../../types/navigation'
import AppState from '../../../../data/AppState'
import { CaseTopic } from '@monaco-digital/vl-types/lib/main'
import { Question as QuestionT } from '../../../../types/Questions'
import { getNextQuestion } from '../../../../clustering/questionFlow'
import useViewport from '../../../utils/useViewport'

const Header: FC = () => {
	const { isMobile } = useViewport()
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics)

	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions)
	const page = useSelector<AppState, keyof typeof pages>(state => state.navigation.page)

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions)
	const [menuIsVisibile, setMenuIsVisibile] = useState(false)

	const dispatch = useDispatch()

	const navigateTo = page => {
		if (page === pages.TOPICS && !currentQuestion) {
			dispatch(removeLastAnsweredQuestion(null))
		}
		dispatch(setPage(page))
	}
	const headerBreacrumbClasses = classNames('header__breadcrumb', {
		'header__breadcrumb--mobile-visible': menuIsVisibile,
	})

	const handleOnClick = () => {
		setMenuIsVisibile(menuIsVisibile => !menuIsVisibile)
	}

	const keyFacts = isMobile ? 'Details' : 'Key facts'
	const buildLetter = isMobile ? 'Build' : 'Build your letter'
	const previewLetter = isMobile ? 'Preview' : 'Preview your letter'

	return (
		<div className="header">
			<a href="https://www.monacosolicitors.co.uk/?from=vl-ui&source=mobile" target="_blank">
				<img alt="Virtual lawyer" src={logo} />
			</a>
			<div className="header__breadcrumb">
				<div className="header__breadcrumb__text">
					<button
						className={page === pages.TOPICS ? 'header__breadcrumb__text-selected' : undefined}
						onClick={() => navigateTo(pages.TOPICS)}
					>
						{keyFacts}
					</button>
				</div>
				{/*				<div className="header__breadcrumb__text">
					<button onClick={() => navigateTo(pages.PARAGRAPHS_PREVIEW)}>
						{buildLetter}
					</button>
				</div>*/}
				<div className="header__breadcrumb__text">
					<button
						className={page === pages.LETTER_PREVIEW ? 'header__breadcrumb__text-selected' : undefined}
						onClick={() => navigateTo(pages.LETTER_PREVIEW)}
					>
						{previewLetter}
					</button>
				</div>
				<div className="header__breadcrumb__text">
					<button
						className={page === pages.HELP ? 'header__breadcrumb__text-selected' : undefined}
						onClick={() => navigateTo(pages.HELP)}
					>
						Help
					</button>
				</div>
			</div>
			<button className="header__burger-btn" onClick={handleOnClick}>
				<i className="fas fa-bars"></i>
			</button>
		</div>
	)
}

export default Header
