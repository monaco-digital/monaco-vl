import React, { useEffect } from 'react';
import { Box, Fab, Grid, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { intersection } from 'lodash';

import { removeLastAnsweredQuestion, selectParagraphs, updateSuggestedParagraphs } from 'data/sessionDataSlice';
import AppState from 'data/AppState';
import { CaseTopic, TemplateParagraph } from 'api/vl/models';
import { SessionParagraph } from 'types/SessionDocument';
import { getSuggestedParagraphs } from 'api/vl';
import { predictParagraphsFromParagraphs } from 'api/ds';

const Narrative: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const {
		register,
		watch,
		handleSubmit,
		errors,
		formState: { isSubmitting },
	} = useForm();

	const watchNarrative = watch('narrative', '');

	const selectedTopics = useSelector<AppState, CaseTopic[]>(state => state.session.selectedTopics);
	const selectedTopicIds = selectedTopics.map(t => t.id);
	if (intersection(selectedTopicIds, ['_RES_CD', '_RES_CO', '_RES_I', '_RES_KM']).length > 0) {
		history.push('/preview');
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
						isSelected: paragraph.paragraph?.isAutomaticallyIncluded,
					} as SessionParagraph),
			);
			dispatch(updateSuggestedParagraphs(sessionParagraphs));
		};
		updateParagraphs();
	}, [dispatch, selectedTopics]);

	const handleGoBackwardsFromStatements = () => {
		dispatch(removeLastAnsweredQuestion());
		history.push('/questions');
	};

	const onSubmit = async ({ narrative }) => {
		// filter out isAutoIncluded paras
		const paras = suggestedParagraphs
			.map(p => (p.templateComponent as TemplateParagraph).paragraph)
			.filter(p => p.isAutomaticallyIncluded === false);

		// get list of paragraphs from AI service
		const predictedParas = await predictParagraphsFromParagraphs(narrative, paras);

		dispatch(selectParagraphs(predictedParas));

		history.push('/preview');
	};

	return (
		<Grid container>
			<Grid item container md={6} direction="column">
				<Typography variant="h6">Provide a summary of your case</Typography>
				<Box py={4}>
					<Card>
						<CardContent>
							<form onSubmit={handleSubmit(onSubmit)} name="narrativeForm">
								<Typography variant="subtitle1">Describe your case</Typography>
								<TextField
									name="narrative"
									multiline
									rows={4}
									rowsMax="Infinity"
									fullWidth
									variant="outlined"
									error={Boolean(errors.narrative)}
									helperText={errors.narrative?.message}
									disabled={isSubmitting}
									inputRef={register({
										required: 'Please add a description of your case',
										maxLength: { value: 2000, message: 'Descriptions cannot be longer than 2000 letters.' },
									})}
								/>
								<Grid container justify="flex-end">
									<Box ml="auto">{watchNarrative.length}/2000</Box>
								</Grid>
							</form>
						</CardContent>
					</Card>
				</Box>
				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					<Box px={1}>
						<Fab variant="extended" color="inherit" onClick={handleGoBackwardsFromStatements}>
							Back
						</Fab>
					</Box>
					<Box px={1}>
						<Fab variant="extended" color="secondary" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
							Preview Letter
						</Fab>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Narrative;
