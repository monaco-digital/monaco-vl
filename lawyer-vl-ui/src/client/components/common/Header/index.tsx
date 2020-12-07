import React, { FC, useState } from 'react'
import classNames from 'classnames'
import logo from '../../../assets/img/virtual-lawyer-logo.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../../../data/navigationDataSlice'
import { removeLastAnsweredQuestion } from '../../../../data/questionDataSlice'
import pages from '../../../../types/navigation'
import AppState from '../../../../data/AppState'
import { unselectTopic } from '../../../../data/topicDataSlice'
import { CaseTopic, Question as QuestionT } from '../../../../data/types'
import { getNextQuestion } from '../../../../clustering/questionFlow'

const Header: FC = () => {
	let selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id)
	let answeredQuestions = useSelector<AppState, QuestionT[]>(
		state => state.questions.answeredQuestions
	)
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
					<button onClick={() => navigateTo(pages.TOPICS)}>Key Facts</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button onClick={() => navigateTo(pages.PARAGRAPHS_PREVIEW)}>
						Build Your Letter
					</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button onClick={() => navigateTo(pages.LETTER_PREVIEW)}>
						Preview Your Letter
					</button>
				</div>
				<div className="header__breadrcrumb__text">
					<button onClick={() => navigateTo(pages.HELP)}>Help</button>
				</div>
			</div>
			<button className="header__burger-btn" onClick={handleOnClick}>
				<i className="fas fa-bars"></i>
			</button>
		</div>
	)
}

export default Header
