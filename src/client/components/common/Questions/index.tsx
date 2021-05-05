import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { CaseTopic } from 'api/vl/models';
import { Box, Fab } from '@material-ui/core';

import AppState from '../../../../data/AppState';
import { Question as QuestionT } from '../../../../types/Questions';
import { getNextQuestion } from '../../../../clustering/questionFlow';
import EndToEndStepper from '../EndToEndStepper';
import Question from '../Question';
import {
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	updateCurrentStep,
	updateSelectedTopics,
} from '../../../../data/sessionDataSlice';

const Questions: FC = () => {
	const history = useHistory();

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id);

	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions);

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions);
	const { id: currentQuestionId } = currentQuestion || {};

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateCurrentStep(0));
	}, [dispatch]);

	if (!currentQuestion) {
		history.push('/statements');
		return null;
	}

	const optionsSelectedCount = currentQuestion.options.reduce(
		(acc, curr) => (selectedTopicIds.includes(curr.topicId) ? acc + 1 : acc),
		0,
	);
	const enableNext = optionsSelectedCount >= currentQuestion.minAnswers;

	const isMulti = currentQuestion.maxAnswers > 1;
	const type = isMulti ? 'tags' : '';

	const classes = classNames('questions', {
		[`questions__${type}`]: type,
	});

	const handleGoForward = () => {
		const nextQuestion = getNextQuestion(selectedTopics, [...answeredQuestions, currentQuestion]);
		const { id } = nextQuestion || {};
		if (!nextQuestion) {
			history.push('/statements');
		}
		dispatch(addAnsweredQuestion(currentQuestion));
		history.push(`/questions/${id}`);
	};

	const handleGoBackwards = () => {
		const optionsToDeselect = currentQuestion.options.map(option => option.topicId);
		const updatedSelectedTopics = selectedTopics.filter(topic => !optionsToDeselect.includes(topic.id));
		dispatch(updateSelectedTopics(updatedSelectedTopics));
		dispatch(removeLastAnsweredQuestion());
		const { id } = answeredQuestions[answeredQuestions.length - 1] || {};
		if (id === undefined) {
			history.push(`/`);
		} else {
			history.push(`/questions/${id}`);
		}
	};

	return (
		<>
			<div className={classes}>
				<EndToEndStepper />
				<Switch>
					<Route exact path="/questions">
						<Redirect to={`/questions/${currentQuestionId}`} />
					</Route>
					<Route path="/questions/:id">
						<Question question={currentQuestion} />
					</Route>
				</Switch>
				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					<Box px={1}>
						<Fab variant="extended" color="inherit" onClick={handleGoBackwards}>
							Back
						</Fab>
					</Box>
					<Box px={1}>
						<Fab variant="extended" color="secondary" onClick={handleGoForward} disabled={!enableNext}>
							Next
						</Fab>
					</Box>
				</Box>
			</div>
		</>
	);
};

export default Questions;
