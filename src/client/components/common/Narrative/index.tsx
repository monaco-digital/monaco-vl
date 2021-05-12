import React from 'react';
import { Box, Fab, Grid, Card, CardContent, Typography, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { gql, useApolloClient } from '@apollo/client';

import { removeLastAnsweredQuestion, updateSuggestedParagraphs } from 'data/sessionDataSlice';
import AppState from 'data/AppState';
import { CaseTopic, Paragraph, TemplateParagraph } from 'api/vl/models';
import { SessionParagraph } from 'types/SessionDocument';
import { fragments } from 'api/vl/fragments';
import EndToEndStepper from '../EndToEndStepper';

const GENERATE_PARAGRAPHS = gql`
	query($topicIds: [String]!, $narrative: String) {
		generateParagraphsTopics(topicIds: $topicIds, narrative: $narrative) {
			...FParagraph
		}
	}
	${fragments.paragraph}
`;

const Narrative: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const client = useApolloClient();

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
		const {
			data: { generateParagraphsTopics },
		} = await client.query<{ generateParagraphsTopics: Paragraph[] }, { topicIds: string[]; narrative: string }>({
			query: GENERATE_PARAGRAPHS,
			variables: {
				topicIds,
				narrative,
			},
		});
		const sessionParagraphs = generateParagraphsTopics.map(
			paragraph =>
				({
					templateComponent: {
						id: paragraph.id,
						type: 'Paragraph',
						version: 1,
						paragraph,
					} as TemplateParagraph,
					documentComponent: null,
					isSelected: paragraph.isAutomaticallyIncluded,
				} as SessionParagraph),
		);
		dispatch(updateSuggestedParagraphs(sessionParagraphs));

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
							Preview Letter
						</Fab>
					</Box>
				</Box>
			</Grid>
		</div>
	);
};

export default Narrative;
