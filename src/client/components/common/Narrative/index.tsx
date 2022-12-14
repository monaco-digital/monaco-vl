import React from 'react';
import { Box, Grid, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AppState from 'data/AppState';
import { CaseTopic } from 'api/vl/models';
import { generateParagraphsByTopics } from 'data/sessionDataThunks';
import EndToEndStepper from '../EndToEndStepper';
import { updateNarrativeCall } from '../../../../data/sessionThunks';
import ActionBar from '../ActionBar';

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
	const academyFlow = useSelector<AppState, boolean>(state => state.features.academyFlow);

	const onSubmit = async ({ narrative }) => {
		const topicIds = selectedTopics.map(t => t.id);
		await dispatch(generateParagraphsByTopics({ topicIds, narrative }));
		await dispatch(updateNarrativeCall(narrative));
		if (academyFlow) {
			history.push('/statementsAcademy');
		} else {
			history.push('/statements');
		}
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
								<Typography variant="subtitle2">Please provide a minimum of 50 characters</Typography>
								<TextField
									className="narrative-field"
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
									})}
								/>
								<Grid container alignItems="center">
									<Box ml="auto">{watchNarrative.length}/2000</Box>
								</Grid>
							</form>
						</CardContent>
					</Card>
				</Box>
				<ActionBar step={2} nextHandler={handleSubmit(onSubmit)} nextDisabled={isSubmitting} />
			</Grid>
		</div>
	);
};

export default Narrative;
