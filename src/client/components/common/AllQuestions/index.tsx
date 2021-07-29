import React, { FC, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic } from 'api/vl/models';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { updateSelectedTopics } from '../../../../data/sessionDataSlice';
import { Question as QuestionType } from '../../../../types/Questions';
import checkTopicInputStatus from '../../../utils/checkTopicInputStatus';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import { allQuestions } from '../../../../clustering/questionFlow';
import Title from '../../Title';
import OptionAccordion from '../OptionAccordion';
import AppState from '../../../../data/AppState';
import { answerQuestion } from '../../../../data/sessionThunks';
import EndToEndStepper from '../EndToEndStepper';
import ActionBar from '../ActionBar';

const AllQuestions: FC = () => {
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);

	const dispatch = useDispatch();
	const history = useHistory();

	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		const updateQuestions = async question => {
			const filteredTopics = selectedTopics
				.filter(topic => question.options.map(option => option.topicId).includes(topic.id))
				.map(topic => topic.id);
			await dispatch(answerQuestion({ questionId: question.id.toString(10), selectedTopics: filteredTopics }));
		};
		allQuestions.forEach(question => updateQuestions(question));
	}, [dispatch, selectedTopics]);

	const allTopics = useSelector<AppState, CaseTopic[]>(state => state.topics.all);

	const recalculateSelectedTopics = (id: string, question: QuestionType, isSingle: boolean): CaseTopic[] => {
		const toDeselect = [];

		// find topic
		const topic = allTopics.find(t => t.id === id);

		// Check if it is already selected
		const isSelected = selectedTopics.find(t => t.id === id);
		if (isSelected) {
			toDeselect.push(id);
		}

		if (isSingle) {
			// if single, deselect all other options from the question
			const optionIds = question.options.map(option => option.topicId);
			toDeselect.push(...optionIds);
		}

		// Deselect all unwanted
		const newSelectedTopics = selectedTopics.filter(t => !toDeselect.includes(t.id));

		if (!isSelected) {
			newSelectedTopics.push(topic);
		}
		return newSelectedTopics;
	};

	const handleNext = () => {
		history.push('/narrative');
	};

	const handleSelectOption = (option: any, question: QuestionType, isSingle: boolean) => {
		ReactGA.event({
			category: 'User',
			action: `Clicked topic: ${option.text}`,
		});
		const updatedSelectedTopics = recalculateSelectedTopics(option.topicId, question, isSingle);
		dispatch(updateSelectedTopics(updatedSelectedTopics));
	};

	const mappedQuestions = allQuestions.map(question => {
		const isSingle = question.maxAnswers === 1;
		const options = question.options.map(option => {
			const { text } = option;
			const { topicId } = option;
			const checked = checkTopicInputStatus(selectedTopics, topicId);

			return (
				<div className="all-questions__option">
					<OptionAccordion
						labelText={text}
						id={topicId}
						onClickHandler={() => handleSelectOption(option, question, isSingle)}
						isChecked={checked}
					/>
				</div>
			);
		});
		return (
			<div className="all-questions__question" key={question.id}>
				<Title heading={question.text} subheading={question.subtext} />
				{options}
			</div>
		);
	});
	return (
		<div className="flex-col w-full all-questions">
			<ScrollToTopOnMount />
			<EndToEndStepper step={0} />
			{mappedQuestions}
			<div className={isSmall ? 'w-full' : 'w-1/2'}>
				<ActionBar step={0} nextHandler={handleNext} showBackButton={false} />
			</div>
		</div>
	);
};

export default AllQuestions;
