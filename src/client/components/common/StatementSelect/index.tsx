import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { CaseTopic, TemplateParagraph } from 'api/vl/models';
import ReactGA from 'react-ga';
import _ from 'lodash';
import { Box, Fab } from '@material-ui/core';

import EndToEndStepper from '../EndToEndStepper';
import OptionAccordion from '../OptionAccordion';

import AppState from '../../../../data/AppState';
import { updateSuggestedParagraphs, selectParagraphs, deselectParagraphs } from '../../../../data/sessionDataSlice';
import { SessionParagraph } from '../../../../types/SessionDocument';
import { getSuggestedParagraphs } from '../../../../api/vl';

const StatementSelect: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const suggestedParagraphs = useSelector<AppState, SessionParagraph[]>(state => state.session.suggestedParagraphs);
	const enableNarrative = useSelector<AppState, boolean>(state => state.features.enableNarrative);

	useEffect(() => {
		const updateParagraphs = async () => {
			// Narrative page will populate suggested paragraphs if enabled
			if (!enableNarrative) {
				const paragraphs = await getSuggestedParagraphs(selectedTopics);
				const sessionParagraphs = paragraphs.map(
					paragraph =>
						({
							templateComponent: paragraph,
							documentComponent: null,
							isSelected: paragraph.paragraph?.isAutomaticallyIncluded,
						} as SessionParagraph),
				);
				dispatch(updateSuggestedParagraphs(sessionParagraphs));
			}
		};
		updateParagraphs();
	}, [dispatch, selectedTopics, enableNarrative]);

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
		history.push('/preview/_ADV');
	};

	const handleGoBackwardsFromStatements = () => {
		history.goBack();
	};

	const statements = suggestedParagraphs.map(sessionParagraph => {
		const templateParagraph = sessionParagraph.templateComponent as TemplateParagraph;
		if (templateParagraph.paragraph?.isAutomaticallyIncluded) {
			// paragraph is already selected. Do not show.
			return null;
		}

		const { id, summary } = templateParagraph.paragraph;
		const selected = sessionParagraph.isSelected;

		return (
			<div className="select-answers__accordion" key={id}>
				<OptionAccordion labelText={summary} id={id} onClickHandler={handleOnClick} isChecked={selected} />
			</div>
		);
	});

	if (!statements.some(s => s)) {
		return <Redirect to="/preview/_ADV" />;
	}

	return (
		<>
			<div className="flex-col w-full select-answers">
				<EndToEndStepper step={0} />
				<div className="questions">
					<h1 className="title">Select all the statements that apply to you</h1>
					<div className="topics">{statements}</div>
					<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
						<Box px={1}>
							<Fab variant="extended" color="inherit" onClick={handleGoBackwardsFromStatements}>
								Back
							</Fab>
						</Box>
						<Box px={1}>
							<Fab variant="extended" color="secondary" onClick={enterLetterPreviewMode}>
								Next
							</Fab>
						</Box>
					</Box>
				</div>
			</div>
		</>
	);
};

export default StatementSelect;
