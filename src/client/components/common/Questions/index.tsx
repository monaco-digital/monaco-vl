import React, { FC } from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic } from '@monaco-digital/vl-types/lib/main';
import { Box, Fab } from '@material-ui/core';

import moreInfoIcon from '../../../assets/img/more-info-icon.svg';
import AppState from '../../../../data/AppState';
import { Question as QuestionT } from '../../../../types/Questions';
import { getNextQuestion } from '../../../../clustering/questionFlow';
import Question from '../Question';
import {
	addAnsweredQuestion,
	removeLastAnsweredQuestion,
	updateSelectedTopics,
} from '../../../../data/sessionDataSlice';

const Questions: FC = () => {
	const history = useHistory();

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id);

	const answeredQuestions = useSelector<AppState, QuestionT[]>(state => state.session.answeredQuestions);

	const currentQuestion = getNextQuestion(selectedTopics, answeredQuestions);
	const dispatch = useDispatch();

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
		dispatch(addAnsweredQuestion(currentQuestion));
	};

	const handleGoBackwards = () => {
		const optionsToDeselect = currentQuestion.options.map(option => option.topicId);
		const updatedSelectedTopics = selectedTopics.filter(topic => !optionsToDeselect.includes(topic.id));
		dispatch(updateSelectedTopics(updatedSelectedTopics));
		dispatch(removeLastAnsweredQuestion());
	};

	return (
		<>
			<div className={classes}>
				<Question question={currentQuestion} />

				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					<Box flexGrow={1}>
						<Fab color="primary" onClick={() => history.push('/help')}>
							<img src={moreInfoIcon} alt="More Info" />
						</Fab>
					</Box>

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
