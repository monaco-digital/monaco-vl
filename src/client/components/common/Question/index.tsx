import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaseTopic } from 'api/vl/models';
import ReactGA from 'react-ga';
import CircularProgress from '@material-ui/core/CircularProgress';
import checkTopicInputStatus from '../../../utils/checkTopicInputStatus';
import { updateSelectedTopics } from '../../../../data/sessionDataSlice';
import { Question as QuestionT } from '../../../../types/Questions';
import AppState from '../../../../data/AppState';
import Title from '../../Title';
import Button from '../../Button';
import OptionAccordion from '../OptionAccordion';

const passesPrerequisites = (prerequisites, selectedTopicIds) => {
	if (prerequisites.length === 0) return true;
	return prerequisites.every(prerequisite => {
		// Allow 'negative' prerequisites
		if (/^!/.test(prerequisite)) {
			return !selectedTopicIds.includes(prerequisite.replace(/^!/, ''));
		}
		return selectedTopicIds.includes(prerequisite);
	});
};

const recalculateSelectedTopics = (
	id: string,
	allTopics: CaseTopic[],
	selectedTopics: CaseTopic[],
	question: QuestionT,
	isSingle: boolean,
): CaseTopic[] => {
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

/* Filters the list of possible options to limit it to only those that pass
the prerequisites */
const filterValidOptions = (options, selectedTopicIds) => {
	const toShow = options.filter(option => {
		const prerequisites = option.prerequisites || [];
		return passesPrerequisites(prerequisites, selectedTopicIds);
	});
	return toShow;
};

interface Props {
	question: QuestionT;
}

const Question: React.FC<Props> = ({ question }: Props) => {
	const dispatch = useDispatch();

	const allTopics = useSelector<AppState, CaseTopic[]>(state => state.topics.all);
	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds: string[] = selectedTopics.map(t => t.id);

	const defaultLimit = 14;

	const isSingle = question.maxAnswers === 1;

	const validOptions = filterValidOptions(question.options, selectedTopicIds);
	const optionsCount = validOptions.length;
	const hasMore = optionsCount > defaultLimit;
	const [showMore, setShowMore] = useState(false);

	let optionsToShow = validOptions;
	if (optionsToShow.length > defaultLimit && !showMore) {
		optionsToShow = optionsToShow.slice(0, defaultLimit);
	}

	const handleOnClick = (id: string) => {
		const option = validOptions.find(o => o.topicId === id);

		ReactGA.event({
			category: 'User',
			action: `Clicked topic: ${option.text}`,
		});
		const updatedSelectedTopics = recalculateSelectedTopics(id, allTopics, selectedTopics, question, isSingle);

		dispatch(updateSelectedTopics(updatedSelectedTopics));
	};

	const answers = optionsToShow.map(option => {
		const { text } = option;
		const { topicId } = option;
		const checked = checkTopicInputStatus(selectedTopics, topicId);

		return (
			<div className="select-answers__accordion" key={topicId}>
				<OptionAccordion labelText={text} id={topicId} onClickHandler={handleOnClick} isChecked={checked} />
			</div>
		);
	});

	return (
		<>
			<div className="select-answers">
				<div className="questions__title">{question.text && <Title text={question} />}</div>
				{!allTopics && <CircularProgress />}
				{allTopics && answers}
				{hasMore && !showMore && <Button type="small" text="show more +" rounded fn={() => setShowMore(true)} />}
				<br />
			</div>
		</>
	);
};

export default Question;
