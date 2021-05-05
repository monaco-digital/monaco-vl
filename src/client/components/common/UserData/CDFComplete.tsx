import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import headerImage from '../../../assets/img/document.svg';

interface Props {
	previewType?: string;
	acknowledge?: boolean;
}

const CDFComplete: FC<Props> = ({ acknowledge, previewType }: Props) => {
	const history = useHistory();

	return (
		<Grid container justify="center" direction="column" alignItems="center" className="space-y-5">
			<div>
				<img src={headerImage} width="80" height="80" alt="" />
			</div>
			<Typography variant="h5">Thank You</Typography>
			<div className="max-w-xs">Your document has been emailed to you and we will be in touch about your case.</div>
			{acknowledge && (
				<Button
					variant="contained"
					size="large"
					color="secondary"
					onClick={() => {
						history.replace(`/preview/${previewType}`);
					}}
				>
					Done
				</Button>
			)}
		</Grid>
	);
};

CDFComplete.defaultProps = {
	previewType: '',
	acknowledge: true,
};

export default CDFComplete;
