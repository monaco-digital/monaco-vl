import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import Topic from '../../Topic'
import Title from '../../Title'
import AppState from '../../../../data/AppState'
import { setView } from '../../../../data/questionDataSlice'
import { updateSuggestedParagraphs } from '../../../../data/paragraphsDataSlice'
import { CaseTopic } from '../../../../data/types'
import Button from '../../Button'
import { ViewLogic } from '../../../../clustering'
import pages from '../../../../types /navigation'
import { setPage } from '../../../../data/navigationDataSlice'
import { CustomParagraphs } from '../../../../data/CustomParagraphs'

const Topics: FC = () => {
	const currentQuestion = useSelector<AppState, any>(
		state => state.questions.currentQuestion
	)
	const selectedTopics = useSelector<AppState, CaseTopic[]>(
		state => state.topics.selected
	)
	const screen = useSelector<AppState, number>(state => state.questions.screen)
	const dispatch = useDispatch()
	const { text, questions } = currentQuestion
	const classes = classNames('topics', {
		[`topics__${questions.type}`]: questions.type,
	})
	const handleGoForward = () => {
		const view = new ViewLogic()
		const currentScreen = {
			screen: screen,
			options: selectedTopics,
		}
		const nextCurrentQuestion = view.getNextView(currentScreen)
		const isLastQuestion = !nextCurrentQuestion.hasOwnProperty('screen')
		dispatch(setView(selectedTopics))
		if (isLastQuestion) {
			dispatch(setPage(pages.PARAGRAPHS_PREVIEW))
		}
	}

	useEffect(() => {
		dispatch(updateSuggestedParagraphs(selectedTopics))
	}, [selectedTopics])

	return (
		<>
			{text && <Title text={text} />}
			<div className={classes}>
				<Topic question={currentQuestion} />
				<div className="topics__actions">
					<Button
						type="main"
						text="Next"
						rounded
						fn={() => handleGoForward()}
						extraClasses="topics__actions-next"
					/>
				</div>
			</div>
		</>
	)
}

export default Topics
