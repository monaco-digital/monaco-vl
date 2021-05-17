import React from 'react';
import { Box, Fab, Grid, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { removeLastAnsweredQuestion, updateNarrative } from 'data/sessionDataSlice';
import AppState from 'data/AppState';
import { CaseTopic } from 'api/vl/models';
import { generateParagraphsByTopics } from 'data/sessionDataThunks';
import EndToEndStepper from '../EndToEndStepper';

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

	const handleGoBackwardsFromStatements = () => {
		dispatch(removeLastAnsweredQuestion());
		history.push('/questions');
	};

	const onSubmit = async ({ narrative }) => {
		const topicIds = selectedTopics.map(t => t.id);
		await dispatch(generateParagraphsByTopics({ topicIds, narrative }));
		dispatch(updateNarrative(narrative));
		history.push('/statements');
	};

	return (
		<div className="w-full">
			<EndToEndStepper step={0} />
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
							Next
						</Fab>
					</Box>
				</Box>
			</Grid>
		</div>
	);
};

export default Narrative;
