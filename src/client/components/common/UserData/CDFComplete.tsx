import React, { FC } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import headerImage from '../../../assets/img/document.svg';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

interface Props {
	previewType?: string;
	isFinalStep?: boolean;
}

const CDFComplete: FC<Props> = ({ isFinalStep, previewType }: Props) => {
	const history = useHistory();
	const matchDefaultFlow = useRouteMatch('/cdf/complete');

	const handleClick = () => {
		if (matchDefaultFlow) {
			history.go(-2);
		} else {
			history.replace(`/preview/${previewType}`);
		}
	};

	return (
		<div className="CDF-complete">
			<ScrollToTopOnMount />
			<Grid container justify="center" direction="column" alignItems="center" className="space-y-5">
				<div>
					<img src={headerImage} width="80" height="80" alt="" />
				</div>
				<Typography variant="h5">Thank You</Typography>
				<div className="max-w-xs">Your document has been emailed to you and we will be in touch about your case.</div>
				{!isFinalStep && (
					<Button variant="contained" size="large" color="secondary" onClick={handleClick}>
						Done
					</Button>
				)}
			</Grid>
		</div>
	);
};

CDFComplete.defaultProps = {
	previewType: '',
	isFinalStep: true,
};

export default CDFComplete;
