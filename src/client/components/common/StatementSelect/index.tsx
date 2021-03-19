import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CaseTopic, BulletPoints, DocumentParagraph, TemplateParagraph } from '@monaco-digital/vl-types/lib/main';
import ReactGA from 'react-ga';
import _ from 'lodash';
import AppState from '../../../../data/AppState';
import Button from '../../Button';
import { updateSuggestedParagraphs, selectParagraphs, deselectParagraphs } from '../../../../data/sessionDataSlice';
import { SessionParagraph } from '../../../../types/SessionDocument';
import { getSuggestedParagraphs } from '../../../../api/vl';

const StatementSelect: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const isMonetizationEnabled = useSelector<AppState, boolean>(state => state.features.enableMonetization);

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds = selectedTopics.map(t => t.id);
	if (_.intersection(selectedTopicIds, ['_RES_CD', '_RES_CO', '_RES_I', '_RES_KM']).length > 0) {
		if (selectedTopicIds.find(topic => topic === '_LET') && isMonetizationEnabled) {
			history.push('/preview/checkout');
		} else {
			history.push('/preview');
		}
	}

	const suggestedParagraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs);

	useEffect(() => {
		const updateParagraphs = async () => {
			const paragraphs = await getSuggestedParagraphs(selectedTopics);
			const sessionParagraphs = paragraphs.map(
				paragraph =>
					({
						templateComponent: paragraph,
						documentComponent: null,
						isSelected: false,
					} as SessionParagraph),
			);
			dispatch(updateSuggestedParagraphs(sessionParagraphs));
		};
		updateParagraphs();
	}, [dispatch, selectedTopics]);

	const handleOnClick = (id: string): void => {
		const selectedSessionParagraph = suggestedParagraphs.find(paragraph => paragraph.templateComponent.id === id);
		if (!selectedSessionParagraph.isSelected) {
			dispatch(selectParagraphs([id]));
		} else {
			dispatch(deselectParagraphs([id]));
		}

		const paragraph = selectedSessionParagraph.templateComponent as TemplateParagraph;
		ReactGA.event({
			category: 'User',
			action: `Selected statement: ${paragraph?.paragraph.summary.substring(0, 30)} - ${id}`,
		});
	};

	const enterLetterPreviewMode = () => {
		if (selectedTopicIds.find(topic => topic === '_LET') && isMonetizationEnabled) {
			history.push('/preview/checkout');
		} else {
			history.push('/preview');
		}
	};

	const statements = suggestedParagraphs.map(sessionParagraph => {
		const templateParagraph = sessionParagraph.templateComponent as TemplateParagraph;
		const documentParagraph = sessionParagraph.documentComponent as DocumentParagraph;
		const { id, summary } = templateParagraph.paragraph;
		const selected = sessionParagraph.isSelected;
		const hasUserInput = templateParagraph.paragraph.paragraphComponents.find(
			pc => pc.type === 'BulletPoints',
		) as BulletPoints;
		const displayInput = hasUserInput && documentParagraph;

		return (
			// FIXME - sort out accessability on these buttons
			// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
			<div key={id} className="topic" onClick={() => handleOnClick(id)}>
				<input type="checkbox" id="" name={summary} value={summary} checked={selected} />
				<label htmlFor={id}>{summary}</label>
				{displayInput && documentParagraph.documentParagraphComponents}
			</div>
		);
	});

	return (
		<>
			<div className="questions">
				<h1 className="title">Select all the statements that apply to you</h1>
				<div className="topics">{statements}</div>
				<div className="">
					<Button type="main" text="Preview Letter" rounded fn={() => enterLetterPreviewMode()} />
				</div>
			</div>
		</>
	);
};

export default StatementSelect;
