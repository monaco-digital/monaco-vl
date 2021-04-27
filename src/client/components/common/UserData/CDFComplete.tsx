import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import headerImage from '../../../assets/img/document.svg';

interface Props {
	previewType?: string;
}

const CDFComplete: FC<Props> = ({ previewType }: Props) => {
	const history = useHistory();

	return (
		<Grid container justify="center" direction="column" alignItems="center" className="space-y-5 max-w-xs">
			<div>
				<img src={headerImage} width="80" height="80" alt="" />
			</div>
			<Typography variant="h5">Thank You</Typography>
			<div>Your document has been emailed to you and we will be in touch about your case.</div>
			<Button
				variant="contained"
				size="large"
				color="secondary"
				onClick={() => {
					history.push(`/preview/${previewType}`);
				}}
			>
				Done
			</Button>
		</Grid>
	);
};

CDFComplete.defaultProps = {
	previewType: '',
};

export default CDFComplete;
