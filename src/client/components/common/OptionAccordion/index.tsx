import React from 'react';
import { Accordion, AccordionSummary, Checkbox, Grid, useMediaQuery } from '@material-ui/core/';
import { useTheme } from '@material-ui/core/styles';

interface Props {
	labelText: string;
	id: string;
	onClickHandler: any;
	isChecked: boolean;
}

const OptionAccordion: React.FC<Props> = ({ labelText, id, onClickHandler, isChecked }: Props) => {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

	const handleOnClick = event => {
		event.stopPropagation();
		onClickHandler(id);
	};

	return (
		<div>
			<Accordion>
				<AccordionSummary>
					<Grid
						container
						justify="space-between"
						alignItems="center"
						spacing={isSmall ? 2 : 5}
						onClick={event => handleOnClick(event)}
					>
						<Grid item xs={10}>
							{labelText}
						</Grid>
						<Grid item xs={2}>
							<Checkbox
								color="primary"
								checked={isChecked}
								onChange={event => handleOnClick(event)}
								onClick={event => event.stopPropagation()}
								onFocus={event => event.stopPropagation()}
							/>
						</Grid>
					</Grid>
				</AccordionSummary>
			</Accordion>
		</div>
	);
};

export default OptionAccordion;
