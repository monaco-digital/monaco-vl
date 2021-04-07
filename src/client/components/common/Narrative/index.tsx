import React from 'react';
import { Box, Fab, Grid, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { removeLastAnsweredQuestion } from 'data/sessionDataSlice';
import moreInfoIcon from '../../../assets/img/more-info-icon.svg';

const Narrative: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { register, watch, handleSubmit, errors } = useForm();

	const watchNarrative = watch('narrative', '');

	const handleGoBackwardsFromStatements = () => {
		dispatch(removeLastAnsweredQuestion());
		history.push('/questions');
	};

	console.log('errors', errors);
	const onSubmit = () => {
		console.log('submit');
		// TODO
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
									inputRef={register({
										required: 'Please Describe your case',
										maxLength: { value: 2000, message: 'Descriptions cannot be longer than 2000 letters.' },
									})}
								/>
								<div>{watchNarrative.length}/2000</div>
							</form>
						</CardContent>
					</Card>
				</Box>
				<Box width="100%" display="flex" flexDirection="row" justifyContent="flex-end">
					<Box flexGrow={1}>
						<Fab color="primary" onClick={() => history.push('/help')}>
							<img src={moreInfoIcon} alt="More Info" />
						</Fab>
					</Box>

					<Box px={1}>
						<Fab variant="extended" color="inherit" onClick={handleGoBackwardsFromStatements}>
							Back
						</Fab>
					</Box>
					<Box px={1}>
						<Fab variant="extended" color="secondary" type="submit" form="narrativeForm">
							Preview Letter
						</Fab>
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Narrative;
