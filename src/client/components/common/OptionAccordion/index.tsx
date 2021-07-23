import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Grid, Typography } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
	labelText: string;
	id: string;
	onClickHandler: any;
	isChecked: boolean;
	paraText?: string;
}

const OptionAccordion: React.FC<Props> = ({ labelText, id, onClickHandler, isChecked, paraText }: Props) => {
	const handleOnClick = event => {
		event.stopPropagation();
		onClickHandler(id);
	};

	return (
		<div>
			<Accordion>
				<AccordionSummary expandIcon={paraText ? <ExpandMoreIcon /> : undefined}>
					<Grid container justify="space-between" alignItems="center" onClick={event => handleOnClick(event)}>
						<Grid item xs={10}>
							{labelText}
						</Grid>
						<Checkbox
							color="primary"
							checked={isChecked}
							onChange={event => handleOnClick(event)}
							onClick={event => event.stopPropagation()}
							onFocus={event => event.stopPropagation()}
						/>
					</Grid>
				</AccordionSummary>
				{paraText && (
					<AccordionDetails>
						<Typography>{paraText}</Typography>
					</AccordionDetails>
				)}
			</Accordion>
		</div>
	);
};

OptionAccordion.defaultProps = {
	paraText: '',
};

export default OptionAccordion;
