import React from 'react';
import { Accordion, AccordionSummary, Checkbox, Grid } from '@material-ui/core/';

interface Props {
	labelText: string;
	id: string;
	onClickHandler: any;
	isChecked: boolean;
}

const OptionAccordion: React.FC<Props> = ({ labelText, id, onClickHandler, isChecked }: Props) => {
	const handleOnClick = event => {
		event.stopPropagation();
		onClickHandler(id);
	};

	return (
		<div>
			<Accordion>
				<AccordionSummary>
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
			</Accordion>
		</div>
	);
};

export default OptionAccordion;
