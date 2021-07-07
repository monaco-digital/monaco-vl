import React, { FC } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { CaseTopic } from 'api/vl/models';
import { Box, Fab } from '@material-ui/core';

import AppState from '../../../../data/AppState';
import { getNextQuestion, getQuestion } from '../../../../clustering/questionFlow';
import EndToEndStepper from '../EndToEndStepper';
import Question from '../Question';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import { addAnsweredQuestion } from '../../../../data/sessionDataSlice';

const Questions: FC = () => {
	const history = useHistory();

	const { id: paramsId } = useParams();
	const currentQuestionId = Number(paramsId);
	const enableNarrative = useSelector<AppState, boolean>(state => state.features.enableNarrative);
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id);

	const answeredQuestions = useSelector<AppState, number[]>(state => state.session.answeredQuestions);

	const currentQuestion = currentQuestionId ? getQuestion(currentQuestionId) : getQuestion(1);

	const dispatch = useDispatch();

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
		const nextQuestion = getNextQuestion(selectedTopics, answeredQuestions, currentQuestion.id);

		dispatch(addAnsweredQuestion(currentQuestion.id));
		if (!nextQuestion) {
			if (enableNarrative) {
				history.push('/narrative');
			} else {
				history.push('/statements');
			}
			return;
		}
		const { id } = nextQuestion || {};
		history.push(`/questions/${id}`);
	};

	const handleGoBackwards = () => {
		history.goBack();
	};

	return (
		<div className="flex-col w-full">
			<ScrollToTopOnMount />
			<EndToEndStepper step={0} />
			<div className={classes}>
				<Question question={currentQuestion} />
				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					{/* Note: Back button is hidden on the first page */}
					{Boolean(currentQuestionId) && (
						<Box px={1}>
							<Fab variant="extended" color="inherit" onClick={handleGoBackwards}>
								Back
							</Fab>
						</Box>
					)}
					<Box px={1}>
						<Fab variant="extended" color="secondary" onClick={handleGoForward} disabled={!enableNext}>
							Next
						</Fab>
					</Box>
				</Box>
			</div>
		</div>
	);
};

export default Questions;
